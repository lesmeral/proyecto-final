const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    username: {
        type: String,
        required: true,
        minLength: [4, 'Name should be minimum of 4 characters'],
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required:true
    },
    password: {
        type: String,
        required: true,
        minLength: [8, 'Password should be minimum of 8 characters']
    },
    isLogin: {
        type:Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)