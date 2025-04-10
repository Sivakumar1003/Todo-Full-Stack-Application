const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

connection.connect(err => {
    if (err) {
        console.log(err);
    } else {
        console.log("database conneccted...");
    }
})

module.exports = connection;