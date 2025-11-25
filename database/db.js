require('dotenv').config()
const mysql = require("mysql2")





     
const db = mysql.createPool({

     host: process.env.host,
     user:  process.env.user,
     database: process.env.database,
     password: process.env.password,
     port: process.env.port,
     waitForConnections: true,
     connectionLimit: 100, // Increased to handle more concurrent connections
     queueLimit: 0

})




module.exports = db

   