const router = require('express').Router()
const controllers = require('./user.controller')

//Middleware
const { protect } = require('../middleware/auth')
router.route('/')
    .get(controllers.getUsers)
    .post(controllers.insertUser)

router.route('/login')
    .post(controllers.login)

router.route('/username')
    .get(protect, controllers.getUserByUsername)

router.route('/uid')
    .get(protect, controllers.getUserByUID)
    
module.exports = router