const asyncHandler = require('express-async-handler')
const repo = require('./user.repository/mongo')
const bcrypt = require('../services/bcrypt')
const jwt = require('../services/jwt')
const getUsers = asyncHandler(async (req, res) => {
    res.json({
        users: await repo.getUsers()
    })
})

const insertUser = asyncHandler(async (req, res) => {
    const newuser = req.body
    const result = await repo.findUserByUsername(newuser.username)

    if(result) {
        res.status(404)
        throw new Error("Username already exist!")
    }

    newuser.password = await bcrypt.hashPassword(newuser.password)
    let user = await repo.insertUser(newuser)

    res.status(200).json({
        msg:'Success register',
        user,
    })
})

const login = asyncHandler(async (req, res) => {
    const {
        username,
        password
    } = req.body

    console.log(req.body)

    const user = await repo.findUserByUsername(username)

    if (user && (await bcrypt.comparePassword(password, user.password))) {
        return res.json({
            id: user.id,
            username: user.username,
            token: jwt.generateToken(user.id)
        })
    }

    throw new Error("Invalid login")
})


const getUserByUsername = asyncHandler(async (req, res) => {
    const username = req.query.username
    const user = await repo.findUserByUsername(username)
    console.log(user)
    res.json(user)
})


const getUserByUID = asyncHandler(async (req, res) => {
    const uid = req.query.uid
    const user = await repo.findUserByID(uid)
    res.json(user)
})

module.exports = {
    getUsers,
    insertUser,
    login,
    getUserByUsername,
    getUserByUID
}