const express = require('express');
const registerController = require('../controllers/registerController');
const router = express.Router();

router.post('/register', registerController.postUser)
router.get('/register', registerController.getUsers)
router.get('/register/:id', registerController.getUserById);
router.patch('/register/:id', registerController.updateUser);

// login user
router.post('/login', registerController.loginUser)
module.exports = router