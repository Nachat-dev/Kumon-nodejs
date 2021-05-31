const { response } = require("express");
var express = require("express");
var mysql = require('mysql2');
var router = express.Router();
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "kumon"
});

db.connect((err) => {
    if (!err) {
        console.log('DB Connected');
    } else {
        console.log('DB Fail');
    }
});
router.get('/std', (req, res) => {
    const stddata = "SELECT * FROM studentdata ORDER BY id ASC";
    db.query(stddata, (err, result) => {
        if (!err) {
            console.log(result);
            res.send(result);
            // res.render('dashboard', { data: rows });


        } else {
            res.flash('error', err);
            //res.render('dashboard', { data: '' });
        }
    })
});

//get Count

router.get('/stdstatus0', (req, res) => {
    const stdstatus = "SELECT * FROM studentdata WHERE policystatus = 2";
    db.query(stdstatus, (err, result) => {
        if (!err) {
            console.log(result);
            res.send(result);
            // res.render('dashboard', { data: rows });


        } else {
            res.flash('error', err);
            //res.render('dashboard', { data: '' });
        }
    })
});

router.get('/stdstatus', (req, res) => {
    const stdstatus = "SELECT * FROM studentdata WHERE policystatus = 1";
    db.query(stdstatus, (err, result) => {
        if (!err) {
            console.log(result);
            res.send(result);
            // res.render('dashboard', { data: rows });


        } else {
            res.flash('error', err);
            //res.render('dashboard', { data: '' });
        }
    })
});

router.get('/stdstatus2', (req, res) => {
    const stdstatus = "SELECT * FROM studentdata WHERE policystatus = '' OR policystatus = NULL ";
    db.query(stdstatus, (err, result) => {
        if (!err) {
            console.log(result);
            res.send(result);
            // res.render('dashboard', { data: rows });


        } else {
            res.flash('error', err);
            //res.render('dashboard', { data: '' });
        }
    })
});

router.get('/stdstatus3', (req, res) => {
    const stdstatus = "SELECT * FROM studentdata WHERE policystatus = 2 ";
    db.query(stdstatus, (err, result) => {
        if (!err) {
            console.log(result);
            res.send(result);
            // res.render('dashboard', { data: rows });

        } else {
            res.flash('error', err);
            //res.render('dashboard', { data: '' });
        }
    })
});

//update data
router.get('/dataid/:id', (req, res) => {
    const dataid = req.params.id
    console.log(dataid);
    db.query('SELECT * FROM studentdata WHERE id =' + dataid, [dataid], (error, results, fields) => {
        if (!error) {
            console.log(results);
            res.send(results);
            return res.redirect('../editdata/:id');

        } else {
            return res.send(C.Status.OK).json({ item });
            //res.render('dashboard', { data: '' });
        }
    });
});


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log("Time: ", Date.now());
    next();
});
// define the home page route
router.get("/", function(req, res) {
    res.send("dashboard");
});

module.exports = router;