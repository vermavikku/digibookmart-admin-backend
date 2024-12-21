const express = require('express');
const winston = require('winston');
const expressWinston = require('express-winston');

const app = express();

//Set up Winston logger with a file transport
const logger = winston.createLogger({
    transports: [
        new winston.transports.File({ filename: 'app.log',level:"info" }),
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    )
});

// Use ExpressWinston middleware for logging HTTP requests
app.use(expressWinston.logger({
    transports: [
        new winston.transports.File({ filename: 'http.log' })
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    )
}));

module.exports = logger;