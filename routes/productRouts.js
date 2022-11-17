const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const productModel = require('../models/productModel')
require('dotenv').config();

//multer storage
const storage = multer.memoryStorage({
    destination: (req, file, cb) => {
        cb(null, '')
    }
});

// upload multer storage
let upload = multer({ storage: storage });

// S3 Access & Secret key
let s3 = new AWS.S3({
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY
});

// POST PRODUCT
router.post('/product', upload.single('image'), (req, res) => {
    let myFile = req.file.originalname.split(',');
    let fileType = myFile[myFile.length - 1];

    const params = {
        ACL: 'public-read',
        Bucket: process.env.PEODUCT_BUCKET,
        Key: `${uuidv4()}.${fileType}`,
        Body: req.file.buffer,
        ContentType: 'image/jpg' || 'image/png'
    };

    s3.upload(params, (error, data) => {
        if (error) {
            res.status(500).send({ "err": error })
        }
        const productData = new productModel({
            title: req.body.title,
            description: req.body.description,
            color: req.body.color,
            image: data.Location,
            mrp: req.body.mrp,
            price: req.body.price,
            rating: req.body.rating,
            review: req.body.review
        });
        productData.save()
            .then(result => {
                res.status(201).send({
                    title: result.title,
                    description: result.description,
                    color: result.color,
                    image: data.Location,
                    mrp: result.mrp,
                    price: result.price,
                    rating: result.rating,
                    review: result.review

                })
            })
            .catch(err => {
                res.send({ message: err })
            })
    })
});

// GET PRODUCT
router.get('/product', productController.getProducts);

// GET PRODUCT BY ID
router.get('/product/:id', productController.getProductById);

// UPDATE PRODUCT
router.patch('/product/:id', productController.updateProduct);

// DELETE PRODUCT
router.delete('/product/:id', productController.deleteProduct);

module.exports = router