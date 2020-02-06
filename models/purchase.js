const mongoose = require('mongoose');
const User = require('../models/user');

const purchaseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    items:{
        type: Object,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    card:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Purchase', purchaseSchema);