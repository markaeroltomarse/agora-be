const router = require('express').Router()
const { protect } = require('../../middleware/auth')

const controller = require('./room.controller')
router.route('/myrooms/:username')
    .get(protect, controller.getMyRooms)

router.route('/')
    .post(protect, controller.createRoom)
    .get(protect, controller.getRoomById)
    .delete(protect, controller.deleteRoomById)
    .put(protect, controller.addParticipants)

router.route('/leave')
    .delete(protect, controller.removeParticipants)

router.route('/state')
    .get(protect, controller.getRoomState)
    .put(protect, controller.updateRoomState)

module.exports = router