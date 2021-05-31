const mysql = require("mysql2");
const express = require("express");
const cookieSession = require("cookie-session");
const session = require("express-session");
const flash = require("express-flash");
const app = express();
const cors = require("cors");
var jwt = require('jsonwebtoken');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
const login = require("./routes/auth");
const dash = require("./routes/dashboard");

app.use(express.static(__dirname));
console.log(__dirname);
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
    next();
});

app.use(session({
    key: 'id',
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000, },
}));

app.use(flash());

//app.use(
//    cookieSession({
//        name: "session",
//        keys: ["key1 , key2"],
//        maxAge: 3600 * 1000 // 1hr
//    })
//);


//db connect test

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "kumon"
});

//login
app.post("/login", function(request, response) {
    console.log(request.body);

    var username = request.body.username;
    var password = request.body.password;

    if (username && password) {
        db.query('SELECT * FROM adminstructor WHERE username = ? AND password = ? ', [username, password], function(error, results, fields) {
            if (results.length > 0 && results[0].Status == 2) {
                request.session.loggedIn = true;
                request.session.username = username;
                request.session.user = results[0].statusname;
                //response.send(request.session.user)
                //console.log(request.session.user)
                response.redirect('/home', )
                    // console.log(results[0].Status)

            } else if (results.length > 0 && results[0].Status == 1) {
                request.session.loggedIn = true;
                request.session.username = username;
                // response.send(results);
                response.redirect('/home')
                    // console.log(results[0].Status)
            } else {
                console.log('error')
                    // console.log(results[0].status)
                response.send('Incorect Username / Password');
            }

            response.end();
        });
    }
    // response.status(200).json({ message: "success" });
});

app.get("/home", function(request, response, ) {
    if (request.session.loggedIn = true) {

        // return response.redirect('http://localhost:3000/dashboard');
        console.log('yeah')
            //response.send(request.session.username)
        console.log('Welcome' + request.session.user);
        // return response.redirect(301, 'http://localhost:3000/dashboard');
    } else {
        console.log('please login')
    }
    response.end();
});

app.use("/dash", dash);
app.use("/auth", login);
app.listen(3001, () => console.log("server is running..."));