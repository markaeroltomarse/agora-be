const mongoose = require('mongoose')

const roomScheme = mongoose.Schema({
    roomName: {
        type: String,
        default: ''
    },
    roomID: Number,
    participants: [String],
    isShareScreen: {
        type:String,
        default() {
            return ''
        }
    },
    userSpot: {
        type:String,
        default() {
            return ''
        }
    },
    admin:String,
},{
    timestamps:true,
})

module.exports = mongoose.model('room', roomScheme)