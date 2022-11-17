const mongoose = require('mongoose');
const registerModel = require('../models/registerModel');
const registerUser = mongoose.model('register', registerModel);

const postUser = async (req, res) => {
    try {
        let signupdata = new registerUser({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            phone_no: req.body.phone_no
        });
        let result = await signupdata.save();
        res.status(201).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
};

const getUsers = async (req, res) => {
    try {
        let getResult = await registerUser.find({})
        res.status(200).json(getResult)
    } catch (err) {
        res.status(500).json(err)
    }
};

const getUserById = async (req, res) => {
    try {
        let getByIdResult = await registerUser.findById({ _id: req.params.id });
        res.status(200).json(getByIdResult)
    } catch (err) {
        res.status(500).json(err)
    }
};
const updateUser = async (req, res) => {
    try {
        let updateResult = await registerUser.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.status(201).json(updateResult)
    } catch (error) {
        res.json(error)
    }
}

const loginUser = async (req, res) => {
    registerUser.findOne({ email: req.body.email }, (err, data) => {
        try {
            if (data) {
                if (data.password == req.body.password) {
                    res.send({ Success: "Success!" });
                } else {
                    res.send({ message: "Wrong password!" });
                }
            } else {
                res.send({ message: "This Email Is not regestered!" });
            }
        } catch (error) {
            res.send(error)
        }
    })
}

module.exports = { postUser, getUsers, getUserById, updateUser, loginUser }