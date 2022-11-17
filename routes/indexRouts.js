const express = require('express');
const router = express.Router();

const banner = require('./bannerRouts');
const blog = require('./blogRouts');
const product = require('./productRouts');
const category = require('./categoryRouts');
const register = require('./registerRouts');
const customer = require('./customerRouts');
const createPayment = require('./createPaymentRouts');
const cart = require('./cartRouts')

router.use(
    '/api',
    banner,
    blog,
    product,
    category,
    register,
    customer,
    createPayment,
    cart
);

module.exports = router