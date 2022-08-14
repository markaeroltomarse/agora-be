const mongoose = require('mongoose')

const roomScheme = mongoose.Schema({
    roomName: {
        type: String,
        default: ''
    },
    roomID: Number,
    participants: [String],
    admin:String,
},{
    timestamps:true,
})

module.exports = mongoose.model('room', roomScheme)