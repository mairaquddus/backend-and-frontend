const { type } = require("express/lib/response");
const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const UsersSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,

    },


})

const UserModel = mongoose.model('User', UsersSchema)
module.exports = UserModel