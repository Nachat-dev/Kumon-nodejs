const mysql = require("mysql2");
const express = require("express");
var router = express.Router();
var jwt = require('jsonwebtoken');





const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "kumon"
});

//login
router.post('/login', function(req, res) {
    console.log(req.body);

    var username = req.body.username;
    var password = req.body.password;
    if (username && password) {
        db.query('SELECT * FROM adminstructor WHERE username = ? AND password = ? ', [username, password], function(error, results, fields) {
            if (results.length > 0 && results[0].Status == 2) {
                jwt.sign({ results }, 'seceretkey', (err, token) => {
                    console.log(token)
                });
                req.session.loggedIn = true;
                req.session.username = username;
                console.log(results[0].Status)
                console.log(results)
                    //res.redirect('/home', )
                    // console.log(results[0].Status)

            } else if (results.length > 0 && results[0].Status == 1) {
                req.session.loggedIn = true;
                req.session.username = username;
                // response.send(results);
                res.redirect('/home')
                    // console.log(results[0].Status)
            } else {
                console.log('error')
                    // console.log(results[0].status)
                res.send('Incorect Username / Password');
            }

            res.end();
        });
    }

});


module.exports = router;