const repo = require('./room.repository/mongo')
const asyncHandler = require('express-async-handler')

const getMyRooms = asyncHandler(async (req, res) => {
    if (!req.params.username) {
        throw new Error('Invalid payload')
    }

    console.log("REQ USER: ",req.user)

    console.log(req.params)
    let result = await repo.getMyRooms(req.params.username)
    console.log(result)
    res.json(result)
})

const createRoom = asyncHandler(async (req, res) => {
    const newRoom = req.body
    let result = await repo.createRoom(newRoom)
    res.json(result)
})

const addParticipants = asyncHandler(async (req, res) => {
    const {roomID, username} = req.body

    if (!roomID) {
        res.status(400)
        throw new Error('Empty Room ID')
    }

    if (!username) {
        res.status(400)
        throw new Error('Empty username')
    }
    console.log(req.body)
    let result = await repo.addParticipants(roomID, username)
    res.json(result)
})


const removeParticipants = asyncHandler(async (req, res) => {
    const {roomID, username} = req.query

    if (!roomID) {
        res.status(400)
        throw new Error('Empty Room ID')
    }

    if (!username) {
        res.status(400)
        throw new Error('Empty username')
    }
    console.log(req.query)
    let result = await repo.removeParticipants(roomID, username)
    res.status(200)
        .json(result)
})

const getRoomById = asyncHandler(async (req, res) => {
    console.log(req.query)
    if (!req.query.id || !req.query.username) throw new Error("Room doesnt Exist")
    let room = await repo.getRoomById(req.query.id, req.query.username)

    res.status(200).json(room)
})

const deleteRoomById = asyncHandler(async (req, res) => {
    if (!req.query.id) {
        res.status(404)
        throw new Error('Invalid id: DELETE')
    } 

    await repo.deleteRoomById(req.query.id)

    res.status(200).json({
        msg: 'Room delete'
    })
})

module.exports = {
    getMyRooms,
    createRoom,
    addParticipants,
    removeParticipants,
    getRoomById,
    deleteRoomById,
}