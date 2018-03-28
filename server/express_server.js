var bcrypt = require('bcrypt');
var mysql = require('mysql');
var express = require("express");
var path = require('path');
var bodyParser = require('body-parser');

var serverProperties = require("./server_properties.json");
var app = express();
var router = express.Router();


console.log("Starting express server\n\n");

/**
 * mysql connection
 */

var connection = mysql.createConnection({
    host: serverProperties['mysql.host'],
    port: serverProperties['mysql.port'],
    user: serverProperties['mysql.user'],
    password: serverProperties['mysql.password'],
    database: serverProperties['mysql.database']
});


/**
 # Routes #
 ---------------- GEN ----------------------
 **/

// landing page route
router.get('/', function (req, res) {
    console.log("landingPage :)");
    landingPage(req, res);
});


//route for registration
router.post('/register', function (req, res) {
    console.log("register :)");
    register(req, res);
});


//route for login
router.post('/login', function (req, res) {
    console.log("login :)");
    login(req, res);
});


//route for setPassword
router.post('/setPassword', function (req, res) {
    console.log("setPassword :)");
    updateUserPassword(req, res);
});


//---------------- QUOTES ----------------------


//route for all quotes
router.get('/quotes', function (req, res) {
    console.log("list quotes :)");
    listQuotes(req, res);
});

//route for single quote
router.get('/quote/:quoteId', function (req, res) {
    console.log("list quotes :)");
    listSingleQuote(req, res);
});

//route for save quote
router.post('/quote', function (req, res) {
    console.log("save quote :)");
    saveQuote(req, res);
});

//route for update quote
router.put('/quote/:quoteId', function (req, res) {
    console.log("save quote :)");
    updateQuote(req, res);
});

//route for delete quote
router.delete('/quote/:quoteId', function (req, res) {
    console.log("save quote :)");
    deleteQuote(req, res);
});


//------------------ USERS --------------------


//route for all user
router.get('/users', function (req, res) {
    console.log("list users :)");
    listUsers(req, res);
});

//route for single user
router.get('/user/:userId', function (req, res) {
    console.log("list user :)");
    listSingleUser(req, res);
});

//route for save user
router.post('/user', function (req, res) {
    console.log("save user :)");
    saveUser(req, res);
});

//route for update user
router.put('/user/:userId', function (req, res) {
    console.log("save user :)");
    updateUser(req, res);
});

//route for delete user
router.delete('/user/:userId', function (req, res) {
    console.log("save user :)");
    deleteUser(req, res);
});


//------------------ ROUTES DONE --------------------


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

    app.use(express.static(path.join(__dirname, '../app')));


    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });


    /* GET home page. */
    app.get('/', function (req, res, next) {

        //Path to my angular app
        res.status(200).sendFile(path.join(__dirname + '../app/index.html'));
    });

    app.use('/api', router);

    app.listen(serverProperties['express.port'], function () {
        console.log("Listening on " + serverProperties['express.port']);
        console.log("App path /api");
    });

}

/**=========================================================**/


function landingPage(req, res) {
    var today = new Date();
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
                        first_name: 'joesmith@jsm.com',
                        last_name: 'joesmith@jsm.com',
                        username: 'joesmith@jsm.com',
                        password: 'joesmith',
                        created: today,
                        modified: today,
                        role_id: 1
                    }
                }
            },
            {
                path: '/api/login',
                info: {
                    type: 'POST',
                    request_data: {
                        username: 'joesmith@jsm.com',
                        password: 'joesmith'
                    }
                }
            },
            {
                path: '/api/setPassword',
                info: {
                    type: 'POST',
                    request_data: {
                        username: 'joesmith@jsm.com',
                        password: 'joesmith'
                    }
                }
            },
            {
                path: '/api/quotes',
                info: {
                    type: 'GET',
                    info: 'This will fetch all quotes'
                }
            },
            {
                path: '/api/quote',
                info: {
                    type: 'POST',
                    info: 'This will save a single quote'
                }
            },
            {
                path: '/api/quote/:quoteId',
                info: {
                    type: 'GET',
                    info: 'This will fetch a single quote by id'
                }
            },
            {
                path: '/api/quote/:quoteId',
                info: {
                    type: 'PUT',
                    info: 'This will update a single quote'
                }
            },
            {
                path: '/api/quote/:quoteId',
                info: {
                    type: 'DELETE',
                    info: 'This will delete a single quote'
                }
            }

            ,
            {
                path: '/api/users',
                info: {
                    type: 'GET',
                    info: 'This will fetch all users'
                }
            },
            {
                path: '/api/user',
                info: {
                    type: 'POST',
                    info: 'This will save a single user'
                }
            },
            {
                path: '/api/user/:userId',
                info: {
                    type: 'GET',
                    info: 'This will fetch a single user by id'
                }
            },
            {
                path: '/api/user/:userId',
                info: {
                    type: 'PUT',
                    info: 'This will update a single user'
                }
            },
            {
                path: '/api/user/:userId',
                info: {
                    type: 'DELETE',
                    info: 'This will delete a single user'
                }
            }
        ]
    });
}

/**
 * ================ Access Control ===============
 */

/**
 * updateUserPassword - set password when null
 * @param req
 * @param res
 */
function updateUserPassword(req, res) {
    var today = new Date();
    var user = {
        "username": req.body.username,
        "password": req.body.password,
        "modified": today
    };


    //lets encrypt the password, when its done creating the hashed value we can save it to the db
    bcrypt.hash(user.password, 10).then(function (hash) {

        //override user password with hashed value
        user.password = hash;


        //save to db
        connection.query('UPDATE users SET password = "' + hash + '"  where username = "' + user.username + '"', function (error, results, fields) {

            if (error) {
                console.log("database error ocurred", error);
                res.send({
                    "code": 400,
                    "message": "database error ocurred"
                })
            } else {
                // res.send({
                //     "code": 200,
                //     "message": "password set"
                // });

                login(req, res);

            }
        });

    });

}

/**
 * register -adds user - reader role
 * @param req
 * @param res
 */
function register(req, res) {
      console.log("req", JSON.stringify(req.body));

    var today = new Date();

    var user = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "username": req.body.username,
        "role_id": "3",
        "created": today,
        "modified": today
    };


    connection.query('SELECT id FROM roles where app_role="' + req.body.role + '"', function (error, result, fields) {
        if (error) {
            //console.log("error ocurred",error);
            res.send({
                "code": 400,
                "message": "database error ocurred roles"
            })
        } else {


            user.role_id = result[0].id;
            console.log(' user.role_id: ',  user.role_id);

            //save to db
            connection.query('INSERT INTO users SET ?', user, function (error, results, fields) {
                if (error) {
                    console.log("database error ocurred", error);
                    res.send({
                        "code": 400,
                        "message": "database error ocurred users"
                    })
                } else {
                    console.log('results insertId: ', results.insertId);

                    res.send({
                        "code": 200,
                        "id": results.insertId,
                    });
                }
            });

        }

    });




};

/**
 * login
 * @param req
 * @param res
 */
function login(req, res) {

    //   console.log("req", JSON.stringify(req.body));

    var username = req.body.username;
    var password = req.body.password;

    connection.query('SELECT u.id,u.first_name,u.last_name,u.username,u.password,u.created,u.modified,u.role_id,r.app_role FROM users u LEFT JOIN roles r on u.role_id = r.id WHERE u.username = ? ', [username], function (error, results, fields) {
            if (error) {
                console.log("error ocurred", error);
                res.send({
                    "code": 400,
                    "message": "database error ocurred"
                })
            } else {
                // console.log('results: ', results);c

                if (results.length > 0) {

                    if (results[0].password != null) {

                        bcrypt.compare(password, results[0].password).then(function (matched) {
                            // matched == true

                            if (matched) {
                                res.send({
                                    "code": 200
                                    , "message": "login ok"
                                    , "user": {
                                        "id": results[0].id
                                        , "first_name": results[0].first_name
                                        , "last_name": results[0].last_name
                                        , "username": results[0].username
                                        , "created": results[0].created
                                        , "modified": results[0].modified
                                        , "role_id": results[0].role_id
                                        , "app_role": results[0].app_role
                                    }

                                });
                            }
                            else {
                                res.send({
                                    "code": 500,
                                    "error": "username and password does not match"
                                });
                            }

                        });

                    } else {
                        res.send({
                            "code": 500,
                            "error": "user needs to provide password",
                            "fix": "provide_password"
                        });
                    }


                }
                else {
                    res.send({
                        "code": 204,
                        "message": "username does not exits"
                    });
                }
            }
        }
    )
    ;
}


/**
 * ================ Quotes ===============
 */

/**
 * listQuotes - returns all quotes
 * @param req
 * @param res
 */

function listQuotes(req, res) {

    connection.query('SELECT * FROM quotes order by modified', function (error, results, fields) {
        if (error) {
            //console.log("error ocurred",error);
            res.send({
                "code": 400,
                "message": "database error ocurred"
            })
        } else {
            // console.log('results: ', results);

            if (results.length > 0) {
                res.send(results);
            } else {
                res.send([]);
            }

        }

    });

}


function listSingleQuote(req, res) {

    var quoteId = req.params.quoteId;

    connection.query('SELECT * FROM quotes where id=? ', quoteId, function (error, results, fields) {
        if (error) {
            //console.log("error ocurred",error);
            res.send({
                "code": 400,
                "message": "database error ocurred"
            })
        } else {
            // console.log('results: ', results);c

            if (results.length > 0) {
                console.log("empty");
                res.send(results[0]);
            } else {
                console.log("empty else");
                res.send([]);
            }

        }

    });

}


function saveQuote(req, res) {
    var today = new Date();
    var quote = {
        "quote": req.body.quote,
        "author": req.body.author,
        "source": req.body.source,
        "year": req.body.year,
        "created": today,
        "modified": today
    };


    //save to db
    connection.query('INSERT INTO quotes SET ? ', quote, function (error, results, fields) {

        if (error) {
            console.log("database error ocurred", error);
            res.send({
                "code": 400,
                "message": "database error ocurred"
            })
        } else {
            res.send({
                "code": 200,
                "message": "quote saved"
            });
        }
    });


}


function updateQuote(req, res) {

    var quoteId = req.params.quoteId;

    var quote = {
        "quote": req.body.quote,
        "author": req.body.author,
        "source": req.body.source,
        "year": req.body.year,
        "modified": new Date()
    };


    //save to db
    connection.query('UPDATE quotes SET ? where id = ' + quoteId, quote, function (error, results, fields) {

        if (error) {
            console.log("database error ocurred", error);
            res.send({
                "code": 400,
                "message": "database error ocurred"
            })
        } else {
            res.send({
                "code": 200,
                "message": "quote updated"
            });
        }
    });


}


function deleteQuote(req, res) {

    var quoteId = req.params.quoteId;


    //delete from db
    connection.query('DELETE FROM quotes where id = ?', quoteId, function (error, results, fields) {

        if (error) {
            console.log("database error ocurred", error);
            res.send({
                "code": 400,
                "message": "database error ocurred"
            })
        } else {
            res.send({
                "code": 200,
                "message": "quote deleted"
            });
        }
    });


}


/**
 * ================ Users ===============
 */


/**
 * listQuotes - returns all quotes
 * @param req
 * @param res
 */

function listUsers(req, res) {

    connection.query('SELECT u.id,u.first_name,u.last_name,u.username,u.password,u.created,u.modified,u.role_id,r.app_role FROM users u LEFT JOIN roles r on u.role_id = r.id order by u.id', function (error, results, fields) {
        if (error) {
            //console.log("error ocurred",error);
            res.send({
                "code": 400,
                "message": "database error ocurred"
            })
        } else {
            // console.log('results: ', results);

            if (results.length > 0) {
                res.send(results);
            } else {
                res.send([]);
            }

        }

    });

}

function listSingleUser(req, res) {

    var userId = req.params.userId;

    connection.query('SELECT * FROM users where id=? ', userId, function (error, results, fields) {
        if (error) {
            //console.log("error ocurred",error);
            res.send({
                "code": 400,
                "message": "database error ocurred"
            })
        } else {
            // console.log('results: ', results);c

            if (results.length > 0) {
                console.log("empty");
                res.send(results[0]);
            } else {
                console.log("empty else");
                res.send([]);
            }

        }

    });

}

//TODO relook save
function saveUser(req, res) {

    var today = new Date();

    var user = {

        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "username": req.body.username,
        "password": req.body.password,
        "role_id": req.body.role_id,
        "created": req.body.created,
        "modified": req.body.modified
    };


    //TODO dont encrypt password again
    //lets encrypt the password, when its done creating the hashed value we can save it to the db
    bcrypt.hash(user.password, 10).then(function (hash) {
        console.log("user.password : ", user.password);
        console.log("hash : ", hash);

        //override user password with hashed value
        user.password = hash;


        //save to db

        //TODO should be update
        connection.query('INSERT INTO users SET ?', user, function (error, results, fields) {
            console.log(fields);
            if (error) {
                console.log("database error ocurred", error);
                res.send({
                    "code": 400,
                    "message": "database error ocurred"
                })
            } else {
                // console.log('results: ', results);

                res.send({
                    "code": 200,
                    "message": "user saved"
                });
            }
        });

    });


}

function updateUser(req, res) {

    var userId = req.params.userId;

    var today = new Date();

    var user = {

        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "username": req.body.username,
        //"password": req.body.password,
        "role_id": req.body.role_id,
        "created": req.body.created,
        "modified": req.body.modified
    };


    //save to db
    connection.query('UPDATE users SET ? where id = ' + userId, quote, function (error, results, fields) {

        if (error) {
            console.log("database error ocurred", error);
            res.send({
                "code": 400,
                "message": "database error ocurred"
            })
        } else {
            res.send({
                "code": 200,
                "message": "user updated"
            });
        }
    });

}

function deleteUser(req, res) {

    var userId = req.params.userId;


    //delete from db
    connection.query('DELETE FROM users where id = ?', userId, function (error, results, fields) {

        if (error) {
            console.log("database error ocurred", error);
            res.send({
                "code": 400,
                "message": "database error ocurred"
            })
        } else {
            res.send({
                "code": 200,
                "message": "user deleted"
            });
        }
    });


}

