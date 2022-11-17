const customerModel = require('../models/customerModel');
const stripe = require('stripe')('sk_test_51LsV5xSJ6AxNwOmPkmfYXSM0Am6i1N1Hw8bOtfGMJAMjsmPCJhLQRyJzHYCmKm9LA19WsAfNYh8yNzxujgxFKxsD00i5Q4apvR');

const postPay = async (req, res) => {
    try {
        const customer = await stripe.customers.create({
            name: req.body.name,
            email: req.body.email,
            metadata: {
                productName: req.body.product,
                color: req.body.color,
                description: 'nide product !'
            }
        })

        // const paymentIntent = await stripe.paymentIntents.create({
        //     amount: req.body.amount,
        //     currency: 'usd',
        //     description: 'my payment'
        // });

        let data = new customerModel(req.body);
        const result = await data.save()

        res.send({
            customerId: customer.id,
            customerEmail: customer.email,
            result,
            // payment: paymentIntent
        });
    } catch (err) {
        res.send({ Error: err })
    }
};

module.exports = { postPay }