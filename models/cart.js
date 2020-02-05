const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user:{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    product:{
        required: true,
        type: Object,
        ref: Product
    },
    quantity:{
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Cart', cartSchema);