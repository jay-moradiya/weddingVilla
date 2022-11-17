const express = require('express');
const blogController = require('../controllers/blogController');
const router = express.Router();
const AWS = require('aws-sdk');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const BlogModel = require('../models/blogModel');
require('dotenv').config();

// MULTER STORAGE   
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

//post blog
router.post('/blog', upload.single('image'), (req, res) => {
    let myFile = req.file.originalname.split(',');
    const fileType = myFile[myFile.length - 1];

    const params = {
        ACL: 'public-read',
        Bucket: process.env.BLOG_BUCKET,
        Key: `${uuidv4()}.${fileType}`,
        Body: req.file.buffer,
        ContentType: 'image/jpg' || 'image/png'
    };
    s3.upload(params, (error, data) => {
        if (error) {
            res.status(500).send({ "err": error })
        }
        const postBlog = new BlogModel({
            title: req.body.title,
            image: data.Location,
            description: req.body.description
        });
        postBlog.save()
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

// get blog
router.get('/blog', blogController.getBlogs);

// get blog by id
router.get('/blog/:id', blogController.getBlogById);

// update blog 
router.patch('/blog/:id', blogController.updateBlog);

// delete blog
router.delete('/blog/:id', blogController.deleteBlog);

module.exports = router