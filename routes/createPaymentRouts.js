const express = require('express');
const router = express.Router();
const createPaymentController = require('../controllers/createPaymentController')

router.post('/addNewCard', createPaymentController.createPayment)

module.exports = router