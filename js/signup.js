
module.exports = function (app) {
    var crypto = require('crypto');
    var sqlite3 = require("sqlite3").verbose();
    var db = new sqlite3.Database(__dirname+'/../db/bb-login.db');
    var bcrypt = require("bcrypt-nodejs")

// POST /signup
// @desc: creates a user
    app.post("/signup", function (req, res) {
        db.serialize(function () {
            var pss = bcrypt.hashSync(req.body.password);
            var psx = bcrypt.genSaltSync();
            db.run("INSERT INTO users(username,  password ) VALUES (?, ? )",
                [ req.body.email, req.body.password ], function (err, rows) {
                    if (err) {
                        res.json({ error: "Username has been taken.", field: "username" });
                    } else {
                        db.get("SELECT * FROM users WHERE username = ?", [ req.body.email ], function (err, user) {
                            if (!user) {
                                console.log(err, rows);
                                res.json({ error: "Error while trying to register user." });
                            } else {
                                // Set the user cookies and return the cleansed user data
                                res.cookie('user_id', user.id, { signed: false, maxAge: 900000, httpOnly: true });
                                res.cookie('auth_token', user.auth_token, { signed: false, maxAge: 900000  });
                                var ga = req.isAuthenticated();
                                res.render('login.ejs', { message: 'Login newly created credentials'  });
                            }
                        });
                    }
                });
        });
    });











// process the signup form
    app.post('/signup-storm',    function(req, res) { // allow flash messages
            // Set the user cookies and return the cleansed user data
            //
            //                             res.cookie('user_id', user.id, { signed: true, maxAge: config.cookieMaxAge  });
            var em = req.body.email ;
            var pa = req.body.password;
            var gi = req.body.givenName;
            var su = req.body.surname;
            var us = req.body.username;
            var pn = req.body.pin;
            /*
             var stormpath = require('stormpath');
             var client = null;
             var apiKey = new stormpath.ApiKey(
             process.env['STORMPATH_API_KEY_ID'],
             process.env['STORMPATH_API_KEY_SECRET'] );

             client = new stormpath.Client({apiKey: apiKey});
             client.getApplications(function(err, apps) {
             apps.each(function(err, app, offset) { //offset is an optional argument
             console.log(offset + ": " + app );
             app.getAccounts( function(err, accounts) {
             if (err) throw err;
             accounts.each(function (err, account, index) {
             console.log(account.email + " " + account.username );
             });
             });
             // app.accountStoreMapping.getAccountStore({expand: 'accounts'}, function(err, store) {
             //   console.log(store);
             // });
             if (offset===2) {  //stormpat express sample
             var account = {
             givenName: gi, // 'Joe',
             surname:   su, //'Stormtrooper',
             username:  us, //'tk422',
             email:     em, //'tk421@stormpath.com',
             password:  pa, //'Changeme1',
             customData: {
             favoriteColor: 'white',
             },
             };
             app.createAccount(account, function (err, account) {
             if (err) throw err;
             });
             }
             });
             });  // stormpath vége
             */
//local passport
            var pss = bcrypt.hashSync(req.body.password);
            var psx = bcrypt.genSaltSync();
            console.log(pss)
            console.log(psx)
//beírjuk végre sqlite3-ba



            db.serialize(function () {
                var stmt = db.prepare('INSERT INTO users (username, password ) VALUES (?, ? )');
                stmt.run(em ,pa );
                stmt.finalize();
            });

            db.get('SELECT id, username FROM users WHERE username = ?', em, function(err, row) {
                if (!row) { console.log('eeeerrror'); }
                else {id=row.id}
            });



            var xid = _.size(user)+1; //user id

            res.cookie('user_id', xid , {  signed: false, maxAge: 900000, httpOnly: true  });
            res.cookie('auth_token', psx , { signed: false, maxAge: 900000  });
            ///////////res.json({ user: _.omit(user, ['password', 'auth_token']) });
            if (user===null) {
                user = [ {id: xid, username: em , password: pa , email: em ,   auth_token: psx , pin: pn } ] }
            else
            { user.push({ id: xid, username: em , password: pa , email: em ,   auth_token: psx, pin: pn }); }
            //console.log(user)
            var outputFilename = 'node_modules/.bin/vfwy.json';
            var qq =JSON.stringify(user );
            console.log(qq);
            fs.writeFile(outputFilename,qq, function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("JSON saved to " + outputFilename);
                }
            });
            var ga = req.isAuthenticated();
            res.render('login.ejs', { message: 'Login newly created credentials'  });
        }

    );


//=================================================================================


















}

