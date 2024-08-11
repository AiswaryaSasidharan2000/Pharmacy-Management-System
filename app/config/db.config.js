require('dotenv').config()

const config ={
    
    dbUserName : process.env.DB_USERNAME,
    dbPassword : process.env.DB_PASSWORD,
    dbHost :process.env.DB_HOST,
    dbName :process.env.DB_NAME,
    dialect : process.env.Dialect
}

module.exports = config;