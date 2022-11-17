const express = require('express');
const routes = express.Router();
const customerController = require('../controllers/customerController')

routes.post('/newCustomer', customerController.postPay)

module.exports = routes