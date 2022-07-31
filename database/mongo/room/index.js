const mongoose = require('mongoose')

const userScheme = mongoose.Schema({
    id: {
        type: Number,
        default: Math.floor(Math.random() + 10000)
    },
    username: String,
    password: String,
    fname: String,
    lname: String
},{
    timestamps:true,
})

module.exports = mongoose.model('user', userScheme)