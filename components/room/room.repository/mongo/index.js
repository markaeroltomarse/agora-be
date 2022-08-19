const Rooms = require('../../../../database/mongo/room')
const Users = require('../../../../database/mongo/user')
//Math.floor(Math.random() + 10000)

const getMyRooms = (username) => {
    return Rooms.find({ participants: username})
}

const findRoomById = (roomID) => {
    return Rooms.findOne({ roomID })
}

const createRoom = (newRoom) => {
    
    newRoom.roomID = Math.floor(Math.random() * 10000)
    newRoom.participants = [newRoom.admin]
   
    if (newRoom.roomName === '') newRoom.roomName = `Room ${newRoom.roomID}`
    return Rooms.create(newRoom)
}

const getRoomById = (roomID, username) => {
    return Rooms.findOne({ roomID, participants: username })
}

const getRoomState = (roomID) => {
    return Rooms.findOne({ roomID }).select('isShareScreen userSpot')
}

const updateRoomState = ({ roomID, isShareScreen, userSpot }) => {
    return Rooms.updateOne({ roomID }, {
        $set: {
            isShareScreen,
            userSpot
        }
    })
}

const addParticipants = (roomID, username) => {
    return Rooms.updateOne({ roomID, participants: { $ne: username } }, {
        $addToSet: {
            participants: username
        }
    })
}

const deleteRoomById = (_id) => {
    return Rooms.deleteOne({ _id })
}

const removeParticipants = (roomID, username) => {
    return Rooms.updateOne({ roomID }, {
        $pull: {
            participants: username
        }
    })
}



module.exports = {
    getMyRooms,
    getRoomState,
    updateRoomState,
    createRoom,
    addParticipants,
    removeParticipants,
    findRoomById,
    getRoomById,
    deleteRoomById
}