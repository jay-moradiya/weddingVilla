const mongoose = require('mongoose');
const schema = mongoose.Schema;

const categorySchema = new schema({
    category: {
        type: String,
        enum: ['man', 'woman', 'kids'],
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = categorySchema