const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        required: true,
        type: String
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    phno:{
        type: String,
        required: true
    },
    cart: []
});

module.exports = mongoose.model('User', userSchema);