const express = require('express')

const app = express()


const { errorHandler } = require('./middleware/errors')
//const winston = require('winston');


//Logs 
// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.json(),
//   defaultMeta: { service: 'user-service' },
//   transports: [
//     //
//     // - Write all logs with importance level of `error` or less to `error.log`
//     // - Write all logs with importance level of `info` or less to `combined.log`
//     //
//     new winston.transports.File({ filename: 'error.log', level: 'error' }),
//     new winston.transports.File({ filename: 'combined.log' }),
//   ],
// });

// if (process.env.NODE_ENV !== 'production') {
//     logger.add(new winston.transports.Console({
//         format: winston.format.simple(),
//     }));
// }

app.use((req, res, next) => {
    // logger.log({
    //     level: 'info',
    //     message: `${req.hostname}: ${req.method}`
    // });

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
app.use(cors(require('./services/cors')))

//Routes
app.use('/api/user', require('./components/user/user.route'))
app.use('/api/room', require('./components/room/room.route'))

// Error handler
app.use(errorHandler)



// Start the app
const PORT = process.env.PORT || 3001
app.listen(PORT, async () => {
    console.log(`Todos service listening on port ${PORT}`)
})

