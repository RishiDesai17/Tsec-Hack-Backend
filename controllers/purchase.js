const mongoose = require('mongoose');
const Purchase = require('../models/purchase');

exports.get_purchases = (req,res)=>{
    Purchase.find().exec().then((result)=>{
        res.json({
            docs: result
        })
    })
}

exports.post_purchase = (req,res)=>{
    const purchase = new Purchase({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        card: req.body.card,
        items: req.body.items,
        userId: req.params.userId
    });
    purchase.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message: "purchase added",
            docs: result
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}