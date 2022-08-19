const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')


//Functions/Services
const { verifyToken } = require('../services/jwt')

const protect = asyncHandler(async (req, res, next) => {
    let token
    console.log(req.headers.authorization)
    if(
        req.headers.authorization
    ) {
        //GET TOKEN FROM HEADER
        token = req.headers.authorization.split(' ')[1]

        //GET USER FROM THE TOKEN
        req.user = await verifyToken(token)

        if(req.user === null) {
            res.status(401)
            throw new Error('Not authorized')
        } else {
            next()
        }

    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})


module.exports = { protect }
