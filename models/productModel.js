const mongoose = require('mongoose');
const model = mongoose.Schema;
const productModel = new model({
    title: {
        type: String,
        required: [true, 'Product name required']
    },
    description: {
        type: String
    },
    color: {
        type: [String],
        required: [true, 'Color is required']
    },
    image: {
        type: [String],
        required: [true, 'image is required']
    },
    mrp: {
        type: Number,
        required: [true, 'MRP is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5]
    },
    review: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('product', productModel)