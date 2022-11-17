const blogModel = require('../models/blogModel');

const postBlog = async (req, res) => {
    try {
        if (!req.body.title || !req.body.image) {
            return res.status(500).json({ message: 'please fill all detail' })
        } else {
            let postblog = new blogModel(req.body);
            let result = await postblog.save();
            res.status(201).json(result)
        }
    } catch (err) {
        res.status(500).json(err)
    }
};

const getBlogs = async (req, res) => {
    try {
        let getResult = await blogModel.find({});
        res.status(200).json(getResult)
    } catch (err) {
        res.status(500).json(err)
    }
};

const getBlogById = async (req, res) => {
    try {
        let getResultById = await blogModel.findById({ _id: req.params.id });
        res.status(200).json(getResultById)
    } catch (err) {
        res.status(500).json(err)
    }
};

const updateBlog = async (req, res) => {
    try {
        let updateResult = await blogModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true, useFindAndModify: true })
        res.status(200).json(updateResult)
    } catch (error) {
        res.json(error)
    }
};

const deleteBlog = async (req, res) => {
    try {
        let deleteResult = await blogModel.findByIdAndDelete({ _id: req.params.id }, req.body);
        res.status(200).json(deleteResult)
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = { postBlog, getBlogs, getBlogById, updateBlog, deleteBlog }