const express = require('express')

const app = express()


const { errorHandler } = require('./middleware/errors')
const winston = require('winston');


//Logs 
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
const cors = require("./services/cors")
cors(app)

//Routes
app.use('/api/user', require('./components/user.route'))

// Error handler
app.use(errorHandler)

//dotenv
require('dotenv/config')

app.use('/', (req, res) => {
    res.send("User service asdasd")
})

// Start the app
const PORT = process.env.PORT | 3001
app.listen(PORT, async () => {
    console.log(`User service listening on port ${PORT}`)
})


//for prod
if (process.env.NODE_ENV === 'production') {
    module.exports = app
}