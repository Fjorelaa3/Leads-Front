const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    company: String,
    firstName: String,
    lastName: String,
    phone: Number,
    email: String
})

const UserModel = mongoose.model('data', UserSchema);
module.exports = UserModel