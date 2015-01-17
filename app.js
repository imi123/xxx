var flash    = require('connect-flash'); //sorrend
var express = require('express')
    //, routes = require('./routes')
    //, user = require('./routes/user')
    , http = require('http')
    , path = require('path')
    , morgan = require('morgan')
    , bodyParser     = require('body-parser')
    //, methodOverride = require('method-override')
    , session        = require('express-session')
    , bcrypt = require("bcrypt-nodejs")
    ,_ = require("underscore")
    , app = express();

var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;


app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({     extended: true }));
//app.use(methodOverride());
app.use(session({secret: 'ilovescotchscotchyscotchscotch' ,     saveUninitialized: true,     resave: true}));
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));

if (app.url === '/favicon.ico') {
    r.writeHead(200, {'Content-Type': 'image/x-icon'} );
    r.end();
    console.log('favicon requested');
    return;
}

// Initialize
swartyog='' , kvartyog='' ,  ch2=''  , ch3=''  , ch4='' , ch6=''  , ch7=''  , ch8='' ; rndnm=0;

var cloud9 = require("./js/dblogs.js");

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : '192.168.1.102',
    //host     : 'szkk.no-ip.org',
    database: 'test',
    user     : 'wp',
    password : 'wp'
});
connection.connect();


function getInfo (callback) {
    var qqry = connection.query(' select *  ,( select rand()) AS rndnum from adc  ORDER BY Id DESC  LIMIT 1');
    qqry.on('result', function(row) {
        callback(null, row);

        cloud9.locator();

    });
};


var crypto = require('crypto');
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(__dirname+'/db/bb-login.db');

db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY,  username TEXT UNIQUE, password TEXT , salt TEXT )");

db.get('SELECT cycle,whrs FROM sys_state s WHERE id = ?', 1, function(err, row) {
    if (!row) {} else  {
      cycle=row.cycle;
      kvartyog=row.whrs}
  });



function hashPassword(password, salt) {

 /*   var hash = crypto.createHash('sha256');
    hash.update(password);
    hash.update(salt);
    return hash.digest('hex');  */
    return(password)
}
passport.use(new LocalStrategy(function(username, password, done) {
    db.get('SELECT salt FROM users WHERE username = ?', username, function(err, row) {
        if (!row) return done(null, false);
        var hash = hashPassword(password, row.salt);


        db.get('SELECT username, id ,password FROM users WHERE username = ? AND password = ?', username, hash, function(err, row) {
            if (!row) return done(null, false);
            return done(null, row);
        });
    });
}));

passport.serializeUser(function(user, done) {
    return done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    db.get('SELECT id, username FROM users WHERE id = ?', id, function(err, row) {
        if (!row) return done(null, false);
        return done(null, row);
    });
});


setInterval(function(){
    swartyog = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    var k  =    (parseInt(kvartyog)+1) ;
    //kvartyog= k.toString();
    getInfo(function(err, result){
        console.log(err || result["Id"])
        kvartyog= result["Id"] ;
        ch2 =  ((   (175.72)  *   (result["48ch1"]  / 3.2) )-46.85).toFixed(2) +' °C'   ;
        rndnm =  (result['rndnum']); rndnm=rndnm.toFixed(7);
        ch3 =  ((   (125.00)  *   (result["48ch2"]  / 3.2) )-6.00).toFixed(2) +' RH%'   ;
        ch4 =  ((Math.pow(2.71 , 1.5995)* result["48ch3"] ) * 0.142).toFixed(2) +' m/s';
        ch6 =  ((   (175.72)  *   (result["49ch1"]  / 3.2) )-46.85).toFixed(2) +' °C'   ;
        ch7 =  ((   (125.00)  *   (result["48ch2"]  / 3.2) )-6.00).toFixed(2) +' RH%'   ;
        ch8 =  ((Math.pow(2.71 , 1.5995)* result["48ch0"] ) * 0.142).toFixed(2) +' m/s';
    });

},2000); // 60 * 60 * óránként




// Create our users table if it doesn't exist
/////////////db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, username TEXT UNIQUE, password TEXT, auth_token TEXT UNIQUE)");


app.set('view engine', 'ejs'); // set up ejs for templating
app.set('.html', require('ejs'));
// required for passport
//app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret

//app.use(session({secret:'somesecrettokenhere'}));
app.use(session({secret: 'ilovescotchscotchyscotchscotch' ,     saveUninitialized: true,     resave: true}));
var cookieParser = require('cookie-parser')('miska macska');

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use('/js',express.static(path.join(__dirname, '/js')));
app.use('/css',express.static(path.join(__dirname, '/css')));
app.use('/assets',express.static(path.join(__dirname, '/assets')));
app.use('/ass',express.static(path.join(__dirname, '/views/ass')));
//app.use('/amcharts',express.static(path.join(__dirname, 'chart/public/amcharts')));






list = function (req, res) {
    var html = "<h2>Szia, " + req.user.username + "</h2><a href='/logout'>Logout</a>";
    res.send(html);
};


app.get('/', function(req,res){
    res.render('index', { title: 'Express' });
});

app.get('/login',  function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('login.ejs', { message: req.flash('loginMessage') });
});

app.get('/touch',  function(req, res) {
    //res.render('/public/9num.html', { message: req.flash('loginMessage') });
     res.sendfile(__dirname+'/public/9num.html' ,     { message: req.flash('signupMessage')      }  );
});
app.post('/Pin', isPinOk  , function(req, res) {
    res.render('navbar', {
        user : 'guest' , // get the user out of session and pass to template
        post : 'sub/clock0.ejs',
        vartyog:  swartyog ,
        led: 'led-green' ,
        odo:   kvartyog
    });
});

// POST /login
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
//   curl -v -d "username=bob&password=secret" http://127.0.0.1:3000/login
app.post('/login',
    passport.authenticate('local',  {
            successRedirect: 'navbar', //navbar
            failureRedirect: '/',
            failureFlash : true // allow flash messages
        }
    ));


app.get('/navbar', isLoggedIn , function(req, res) {
    console.log(req.user.username),
       res.render('navbar', { //navbar
        user :  req.user.username , // get the user out of session and pass to template
        post : 'sub/ulist.html',  //clock0.ejs
        vartyog:  swartyog ,
        led:    'led-green',
        odo:   kvartyog
    });
});


app.get('/c327kbx4c2e', isLoggedIn, function(req, res) {
   //  res.writeHead(303, {'Location': 'http:localhost:8080'+req.url}); // külsú Url
   // res.end();
  //  res.sendfile(__dirname+'/public/speedy.html' ,     { message: req.flash('signupMessage')      }  );
    res.render('navbar', {
        user : req.user.username , // get the user out of session and pass to template
        post : 'sub/speedy1.html'
    });
});

app.get('/signup', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup.ejs', { message: req.flash('signupMessage') });
});


// test purpose

app.all('/users', isLoggedIn);
app.get('/users', list);
app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
function isPinOk(req, res, next) {
    if (req.body.calcvalues=='1111')
        return next();
    res.redirect('/');
}

app.get('/devstat', function(req, res) {
    res.send( { vartyog:  swartyog , odo: kvartyog ,   led: 'led-red' , ch2: ch2  , rndnm: rndnm   });
 //   res.send(swartyog+','+kvartyog);
});
app.get('/c328kbx4c3e', isLoggedIn, function(req, res) { //DailyGraph
    res.render('navbar', {
        user : req.user.username , // get the user out of session and pass to template
        post : 'sub/lrd.htm'
    });
});
app.get('/Setup', function(req, res) {
    res.render('navbar', {
        user : req.user.username , // get the user out of session and pass to template
        post : 'sub/updated-gg.html'
    });
});
require("./js/signup.js")(app);
