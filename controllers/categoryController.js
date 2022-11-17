const mongoose = require('mongoose')
const categoryModel = require("../models/categoryModel");
const category = mongoose.model('category', categoryModel);

const postCategory = async (req, res) => {
    try {
        const postcategory = new category(req.body);
        const result = await postcategory.save();
        res.status(201).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
};

const getCategorys = async (req, res) => {
    try {
        const getResult = await category.find();
        res.status(201).send(getResult)
    } catch (error) {
        res.status(500).send(error)
    }
};

const getCategoryById = async (req, res) => {
    try {
        const getByIdResult = await category.findById({ _id: req.params.id });
        res.status(201).send(getByIdResult)
    } catch (error) {
        res.status(500).send(error)
    }
};

module.exports = { postCategory, getCategorys, getCategoryById }