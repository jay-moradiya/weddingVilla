const mongoose = require('mongoose');
const customerModel = new mongoose.Schema({
    name: String,
    email: String,
    amount: String
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('customer', customerModel)