const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    return jwt.sign({ id },  process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

const verifyToken = token => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch(err) {
        console.log(err)
        return null
    }
}

module.exports = {
    generateToken,
    verifyToken
}