const mongoose = require('mongoose');
const bannerModel = require("../models/bannerModel");
const banner = mongoose.model('banner', bannerModel);

// post banner
const postBanner = async (req, res) => {
    try {
        if (!req.body.title || !req.body.image) {
            return res.status(500).json({ msg: 'please fill all detail' })
        } else {
            const postNewbanner = new banner(req.body);
            const result = await postNewbanner.save();
            res.status(201).send(result);
        }
    } catch (err) {
        res.status(500).send(err);
    }
};

const getBanners = async (req, res) => {
    try {
        const getResult = await banner.find();
        res.status(200).send(getResult);
    } catch (err) {
        res.status(500).send(err);
    }
};

const getBannerById = async (req, res) => {
    try {
        const getByIdResult = await banner.findById({ _id: req.params.id });
        res.status(200).send(getByIdResult);
    } catch (err) {
        res.status(500).send(err);
    }
};

const updateBanner = async (req, res) => {
    try {
        let updateResult = await banner.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true, useFindAndModify: true })
        res.status(200).json(updateResult)
    } catch (error) {
        res.json(error)
    }
};

const deleteBanner = async (req, res) => {
    try {
        let deleteResult = await banner.findByIdAndDelete({ _id: req.params.id }, req.body);
        res.status(200).json(deleteResult)
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = { postBanner, getBanners, getBannerById, updateBanner, deleteBanner }