const mongoose = require('mongoose');
const Product = require('../models/product');

exports.get_products = (req,res)=>{
    Product.find().exec().then((products)=>{
        res.json({
            docs: products
        })
    })
}

exports.post_products = (req,res)=>{
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        subcategory: req.body.subcategory,
        image: req.body.image
    });
    product.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message: "Product added",
            docs: result
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}