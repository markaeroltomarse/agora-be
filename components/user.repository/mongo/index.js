const User = require('../../../database/mongo/user')

const getUsers = async () => {
    return await User.find()
}

const insertUser = async ({
    fname, lname, username, password
}) => {
    const id = Math.floor(Math.random() * 10000)
    const result = await User.create({
        fname, lname, username, password, id
    })
    return result
}

const findUsersByUsername = async (username) => {
    const results = await User.find({ username: username })
    return results
}

const findUserByUsername = async (username) => {
    const result = await User.findOne({ username })
    return result
}

const findUserByID = async (uid) => {
    const result = await User.findOne({ id: uid })
    return result
}

module.exports = {
    getUsers,
    findUsersByUsername,
    findUserByUsername,
    insertUser,
    findUserByID
}