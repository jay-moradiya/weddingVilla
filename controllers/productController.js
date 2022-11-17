const productModel = require('../models/productModel');

const postProduct = async (req, res) => {
    try {
        if (!req.body.title || !req.body.description || !req.body.image || !req.body.price ||
            !req.body.mrp || !req.body.rating || !req.body.review || !req.body.color) {
            return res.status(500).json({ msg: 'please fill all detail' })
        } else {
            let productdata = new productModel(req.body);
            let result = await productdata.save();
            res.status(201).json(result)
        }
    } catch (err) {
        res.status(500).json(err)
    }
};

const getProducts = async (req, res) => {
    try {
        let { page, limit } = req.query;
        if (!page) page = 1;
        if (!limit) limit = 5;
        let skip = (page - 1) * 5;
        let getResult = await productModel.find({}).skip(skip).limit(limit);
        res.status(200).json({ result: getResult })
    } catch (err) {
        res.status(500).json(err)
    }
};

const getProductById = async (req, res) => {
    try {
        let getResultById = await productModel.findById({ _id: req.params.id });
        res.status(200).json(getResultById)
    } catch (err) {
        res.status(500).json(err)
    }
};0

const updateProduct = async (req, res) => {
    try {
        let updateResult = await productModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true, useFindAndModify: true })
        res.status(200).json(updateResult)
    } catch (error) {
        res.json(error)
    }
};

const deleteProduct = async (req, res) => {
    try {
        let deleteResult = await productModel.findByIdAndDelete({ _id: req.params.id }, req.body);
        res.status(200).json(deleteResult)
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.products = async () => {
    const products = await productModel.find();
    return products;
};
const productById = async id => {
    const product = await productModel.findById(id);
    return product;
}
exports.createProduct = async payload => {
    const newProduct = await productModel.create(payload);
    return newProduct
}
exports.removeProduct = async id => {
    const product = await productModel.findByIdAndRemove(id);
    return product
}

module.exports = { postProduct, getProducts, getProductById, updateProduct, deleteProduct, productById }