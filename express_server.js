var bcrypt = require('bcrypt');
var mysql = require('mysql');
var express = require("express");
var path = require('path');
var bodyParser = require('body-parser');

var appProperties = require("./app_properties.json");
var app = express();
var router = express.Router();


console.log("Starting express server\n\n");

/**
 * mysql connection
 */

var connection = mysql.createConnection({
    host: appProperties['mysql.host'],
    user: appProperties['mysql.user'],
    password: appProperties['mysql.password'],
    database: appProperties['mysql.database']
});


/**
 *
 # Routes #

 **/


// landing page route
router.get('/', function (req, res) {
    console.log("landingPage :)");
    landingPage(req, res);
});


//route to handle user registration and login
router.post('/register', function (req, res) {
    console.log("register :)");
    register(req, res);
});


router.post('/login', function (req, res) {
    console.log("login :)");
    login(req, res);
});

//--------------------------------------


//after connection spin up express server to listen for requests

connection.connect(
    function (err) {
        if (!err) {
            console.log("Database is connected!");

            //db connection made start the server
            setupExpressApp();

        } else {
            console.log("ERROR connecting database !!! ");
        }
    });


/**=========================================================**/

function setupExpressApp() {
    //set path for backend

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.use('/api', router);

    app.listen(appProperties['express.port'], function () {
        console.log("Listening on " + appProperties['express.port']);
        console.log("App path /api");
    });

}


function landingPage(req, res) {

    res.json({
        message: 'welcome to quote app backend',
        endpoints: [
            {
                path: '/api/',
                info: {
                    type: 'GET',
                    info: 'This is root landing page. You are here!'
                }
            },
            {
                path: '/api/register',
                info: {
                    type: 'POST',
                    request_data: {
                        email: 'joesmith@jsm.com',
                        password: 'joesmith'
                    }
                }
            },
            {
                path: '/api/login',
                info: {
                    type: 'POST',
                    request_data: {
                        email: 'joesmith@jsm.com',
                        password: 'joesmith'
                    }
                }
            }
        ]
    });
}

function register(req, res) {
    console.log("req", JSON.stringify(req.body));

    var today = new Date();

    var user = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "email": req.body.email,
        "password": req.body.password,
        "created": today,
        "modified": today
    };


    //lets encrypt the password, when its done creating the hashed value we can save it to the db
    bcrypt.hash(user.password, 10).then(function (hash) {
        console.log("user.password : ", user.password);
        console.log("hash : ", hash);

        //override user password with hashed value
        user.password = hash;


        //save to db
        connection.query('INSERT INTO users SET ?', user, function (error, results, fields) {
            console.log(fields);
            if (error) {
                console.log("database error ocurred", error);
                res.send({
                    "code": 400,
                    "message": "database error ocurred"
                })
            } else {
                console.log('results: ', results);

                res.send({
                    "code": 200,
                    "message": "register ok"
                });
            }
        });

    });


}


function login(req, res) {

    console.log("req", JSON.stringify(req.body));

    var email = req.body.email;
    var password = req.body.password;

    connection.query('SELECT * FROM users WHERE email = ?', [email], function (error, results, fields) {
        if (error) {
            //console.log("error ocurred",error);
            res.send({
                "code": 400,
                "message": "database error ocurred"
            })
        } else {
            console.log('results: ', results);
            if (results.length > 0) {

                bcrypt.compare(password, results[0].password).then(function (matched) {
                    // matched == true

                    if (matched) {
                        res.send({
                            "code": 200,
                            "message": "login ok"
                        });
                    }
                    else {
                        res.send({
                            "code": 204,
                            "message": "Email and password does not match"
                        });
                    }

                });

            }
            else {
                res.send({
                    "code": 204,
                    "message": "Email does not exits"
                });
            }
        }
    });
}




