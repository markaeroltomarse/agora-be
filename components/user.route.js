const router = require('express').Router()
const controllers = require('./user.controller')

router.route('/')
    .get(controllers.getUsers)
    .post(controllers.insertUser)

router.route('/login')
    .post(controllers.login)
    
module.exports = router