const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDatabase = require('./config/dbConn');

// Handle uncaught exception

process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('shutting down due to uncaught exception')
    process.exit(1);
})

// setting up config usage 
dotenv.config({path: 'backend/config/config.env'});

const PORT = process.env.PORT
const MODE = process.env.NODE_ENV


connectDatabase();


const server = app.listen(PORT, () => {
        console.log(`Server is running on ${PORT} in ${MODE} mode `)
})


// handle unhandled promise rejection
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log('shutting down the server due to unhandled promise rejection');
    server.close(() => {
        process.exit(1)
    })
})
