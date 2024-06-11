require('dotenv').config()
const mysql = require("mysql")




const db = mysql.createConnection({
    host: process.env.host,
    user : process.env.user,
    database: process.env.database,
    password: process.env.password,
    port: process.env.port,
}) 


module.exports = db

