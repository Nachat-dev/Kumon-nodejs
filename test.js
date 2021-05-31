const mysql = require('mysql2');
const express = require('express');
const cookieSession = require('cookie-session');
const path = require('path');
const dbconnection = require('./database');
const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kumon'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('mysql Connect..');
});

app.get('/getpost', (req, res) => {
    let sql = 'SELECT * FROM adminstructor';
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('post fetched');
    });
});

app.listen('3031', () => {
    console.log('server start on port 3031');
});