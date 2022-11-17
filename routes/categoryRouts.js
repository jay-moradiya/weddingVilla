const express = require('express');
const categoryController = require('../controllers/categoryController');
const router = express.Router();

router.post('/category', categoryController.postCategory);
router.get('/category', categoryController.getCategorys);
router.get('/category/:id', categoryController.getCategoryById);


module.exports = router 