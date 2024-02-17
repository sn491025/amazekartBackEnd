const mongoose = require("mongoose");

const productDetailSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'product name is required']
        },
        detail: {
            type: String,
            required: [true, 'product detail is required']
        },
        images: {
            type: Array,
            required: [true, 'product image is required']
        },
        rate: {
            type: Number,
            required: [true, 'product rate is required']
        },
        category: {
            type: String,
            required: [true, 'product category is required']
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        brand: {
            type: String,
            required: true,
        },
        inStock: {
            type: Boolean,
            required: true,
            default: false
        }

    },
    {
        timestamps: true,
    }
);

const ProductModel = mongoose.model('Product', productDetailSchema);

module.exports = ProductModel;