const mysql = require('mysql2');
const dbconnection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "kumon"
}).promise();
module.exports = dbconnection;