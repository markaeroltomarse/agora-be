const fs = require('fs/promises')
const path = require('path')
const express = require('express')
const app = express()

const { errorHandler } = require('./middleware/errors')
const winston = require('winston');

// Logs
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

app.use((req, res, next) => {
    logger.log({
        level: 'info',
        message: `${req.hostname}: ${req.method}`
    });

    next()
})


//Config
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
require('dotenv/config')


// Run database
const connectDB = require('./database/db')
connectDB()

// Cors Policy
const cors = require("cors")
const corsConfig = require('./services/cors')
app.use(cors(corsConfig))

//Routesnpm
app.use('/api/user', require('./components/user/user.route'))
app.use('/api/room', require('./components/room/room.route'))

// Error handler
app.use(errorHandler)

// AGORA 

app.get('/AgoraRTM', async (req, res) => {
    const AgoraRTM = await fs.readFile(path.join(__dirname, '/services/agora-rtm-sdk-1.4.5.js'))
    res.type('.js')
    res.send(AgoraRTM.toString())
})

app.get('/AgoraRTC', async (req, res) => {
    const AgoraRTC = await fs.readFile(path.join(__dirname, '/services/AgoraRTC_N-4.13.0.js'))
    res.type('.js')
    res.send(AgoraRTC.toString())
})

// Start the app
const PORT = process.env.PORT || 3001
app.listen(PORT, async () => {
    console.log(`Todos service listening on port ${PORT}`)
})

