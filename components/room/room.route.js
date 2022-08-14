const router = require('express').Router()
const { protect } = require('../../middleware/auth')

const controllers = require('./room.controller')
router.route('/myrooms/:username')
    .get(protect, controllers.getMyRooms)

router.route('/')
    .post(protect, controllers.createRoom)
    .get(protect, controllers.getRoomById)
    .delete(protect, controllers.deleteRoomById)
    .put(protect, controllers.addParticipants)

router.route('/leave')
    .delete(protect, controllers.removeParticipants)

module.exports = router