const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogModel = new Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    description: {
        type: String
    },
    image: {
        type: [String],
        required: [true, 'blog image is required']
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('blog', blogModel)