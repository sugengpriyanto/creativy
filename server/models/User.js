const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userInfoSchema = new Schema({
    firstName: String,
    lastName: String,
    address: Object,
    profilePict: {type: String, default: ""}
})

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isSeller: {
        type: Boolean,
        default: false
    },
    userInfo: [userInfoSchema]
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)