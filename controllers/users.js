const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
var accountsid = 'ACcce74ae2e727aed44139c2cbb2936d3f';
var token = 'b204e4ff4c05d3f9662442ebcd7a3cf2'
const twilio = require('twilio');

exports.users_signup = (req,res)=>{
    User.find({email: req.body.email}).exec().then(user=>{
        if(user.length>0){
            res.status(409).json({
                message: "Email exists"
            })
        }
        else{
            bcrypt.hash(req.body.password, 10, (err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error: err
                    })
                }
                else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash,
                        name: req.body.name,
                        phno: req.body.phno
                    })
                    user.save().then(result=>{
                        console.log(result);
                        res.status(201).json({
                            message: 'User Created'
                        })
                    }).catch(err=>{
                        res.status(500).json({
                            error: err
                        })
                    })
                }
            })
        }
    })
}

exports.users_login = (req,res,next)=>{
    User.find({email: req.body.email}).exec().then(user=>{
        if(user.length===0){
            return res.status(401).json({
                message: 'Authorization failed'
            })
        }
        else{
            bcrypt.compare(req.body.password, user[0].password, (err,result)=>{
                if(err){
                    res.status(401).json({
                        message: 'Authorization failed'
                    })
                }
                if(result){
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    }, "SECRETKEY", {
                        expiresIn: '60s'
                    })
                    return res.status(200).json({
                        message: 'Authorization successful',
                        token: token,
                        docs: user
                    })
                }
                else{
                    return res.status(401).json({
                        message: 'Authorization failed'
                    })
                }
            })
        }
    }).catch(err=>{
        res.status(500).json({
            error: err
        })
    })
}

exports.get_user = (req,res,next) => {
  User.find({_id: req.params.userId}).exec().then(user=>{
    res.status(200).json({
      docs: user
    })
  })
}

exports.check = (req,res,next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, "SECRETKEY");
        req.userData = decoded;
        res.status(200).json({
            message:"success"
        })
    }
    catch(err){
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
}

exports.users_delete_user = (req,res,next)=>{
    User.remove({_id: req.params.userId}).exec().then(result=>{
        res.status(200).json({
            message: "user Deleted"
        })
    }).catch(err=>{
        res.status(500).json({
            error: err
        })
    })
}

exports.update = (req,res,next)=>{
    const id = req.params.userId;
    User.update({_id: id}, {$set: req.body}).exec().then(result=>{
        res.status(200).json({
            message: 'Updated',
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}

exports.message=(req,res)=>{
    var client = new twilio(accountsid, token);

client.messages.create({
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:'+req.body.phno,
    body: req.body.text
}).then((msg)=>{
    res.json({
        message: msg.sid
    });
}).catch(err=>console.log(err))

}