const mongoose = require('mongoose');
const stripeModel = new mongoose.Schema({
    cardNumber: { type: String },
    cardExpMonth: { type: String },
    cardExpYear: { type: String },
    cardCVC: { type: String },
    cardName: { type: String },
    country: { type: String },
    postal_code: { type: String }
},
    {
        timestamps: true,
        versionKey: false
    });

module.exports = mongoose.model('payment', stripeModel)