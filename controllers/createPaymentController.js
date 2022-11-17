const createPaymentModel = require('../models/createPaymentModel')
const stripe = require('stripe')('sk_test_51LsV5xSJ6AxNwOmPkmfYXSM0Am6i1N1Hw8bOtfGMJAMjsmPCJhLQRyJzHYCmKm9LA19WsAfNYh8yNzxujgxFKxsD00i5Q4apvR');
const customerId = 'cus_Mkvl0frSZ94pbu'
const createPayment = async (req, res) => {
    const {
        cardNumber,
        cardExpMonth,
        cardExpYear,
        cardCVC,
        cardName,
        country,
        postal_code,
    } = req.body;

    if (!cardNumber || !cardExpMonth || !cardExpYear || !cardCVC) {
        return res.status(400).send({
            Error: "Please Provide All Necessary Details to save the card",
        });
    }
    try {
        const cardToken = await stripe.tokens.create({
            card: {
                name: cardName,
                number: cardNumber,
                exp_month: cardExpMonth,
                exp_year: cardExpYear,
                cvc: cardCVC,
                address_country: country,
                address_zip: postal_code,
            },
        });

        const card = await stripe.customers.createSource(customerId, {
            source: `${cardToken.id}`
        });

        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: 'usd',
            description: 'my payment'
        });

        const data = new createPaymentModel({
            cardName: req.body.cardName,
            cardNumber: req.body.cardNumber,
            cardExpMonth: req.body.cardExpMonth,
            cardExpYear: req.body.cardExpYear,
            cardCVC: req.body.cardCVC,
            country: req.body.country,
            postal_code: req.body.postal_code
        })
        let result = await data.save()
        return res.status(200).send({
            card: card.id,
            result,
            paymentIntent
        });
    } catch (error) {
        return res.status(400).send({
            Error: error.raw.message,
        });
    }
};

module.exports = { createPayment }