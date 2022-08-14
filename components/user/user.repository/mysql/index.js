const connection = require('../database/db')

const getUsers = async () => {
    return await connection("SELECT * FROM user")
}

const insertUser = async ({
    fname, lname, username, password
}) => {
    const result = await connection(`INSERT INTO user (fname, lname, username, password) VALUES ('${fname}', '${lname}', '${username}', '${password}')`)
    return result
}

const findUsersByUsername = async (username) => {
    const results = await connection(`SELECT id, fname, lname, username, password FROM user WHERE username='${username}'`)
    return results
}

const findUserByUsername = async (username) => {
    const results = await connection(`SELECT id, fname, lname, username, password FROM user WHERE username='${username}'`)
    return results[0] || null
}

module.exports = {
    getUsers,
    findUsersByUsername,
    findUserByUsername,
    insertUser
}