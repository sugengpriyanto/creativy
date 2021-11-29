const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false //this is for debug only. Change to True in produuction
    },
    categories: {
        type: Array,
        required: false
    },
    userId: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Product', productSchema)