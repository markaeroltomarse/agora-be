const mongoose = require('mongoose')

const userScheme = mongoose.Schema({
    id: Number,
    username: String,
    password: String,
    fname: String,
    lname: String
},{
    timestamps:true,
})

module.exports = mongoose.model('user', userScheme)