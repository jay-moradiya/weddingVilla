const express = require('express');
const bannerController = require('../controllers/bannerController');
const router = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid')
const bannerModel = require('../models/bannerModel')
require('dotenv').config();

// multer storage 
const storage = multer.memoryStorage({
    destination: (req, file, cb) => {
        cb(null, '')
    }
});

// upload multer storage
const upload = multer({ storage: storage });

// S3 Access & Sectet key
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY
});

// post banner
router.post('/banner', upload.single('image'), (req, res) => {
    let myFile = req.file.originalname.split(',');
    const fileType = myFile[myFile.length - 1];

    const params = {
        ACL: 'public-read',
        Bucket: process.env.BANNER_BUCKET,
        Key: `${uuidv4()}.${fileType}`,
        Body: req.file.buffer,
        ContentType: 'image/jpg' || 'image/png'
    };
    s3.upload(params, (error, data) => {
        if (error) {
            res.status(500).send({ "err": error })
        }
        const postBanner = new bannerModel({
            title: req.body.title,
            image: data.Location,
            description: req.body.description
        });
        postBanner.save()
            .then(result => {
                res.status(201).send({
                    title: result.title,
                    image: data.Location,
                    description: result.description
                })
            })
            .catch(err => {
                res.send({ message: err })
            })
    })
});

// get banner
router.get('/banner', bannerController.getBanners);

// get banner by id
router.get('/banner/:id', bannerController.getBannerById);

// update banner
router.patch('/banner/:id', bannerController.updateBanner);

// delete banner
router.delete('/banner/:id', bannerController.deleteBanner);

module.exports = router