const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const customFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(), 
        customFormat 
    ),
    transports: [
        new transports.Console(), // Output logs to the console
        new transports.File({ filename: 'app.log' }) // Output logs to a file
    ]
});

module.exports = logger;
