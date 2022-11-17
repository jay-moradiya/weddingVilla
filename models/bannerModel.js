const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// banner model
const bannerModel = new Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    image: {
        type: [String],
        required: [true, 'image is required']
    },
    description: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('banner', bannerModel)