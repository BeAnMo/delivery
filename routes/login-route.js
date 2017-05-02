/******** Login Routes Module ****************************/
const express       = require('express'),
      multer        = require('multer'),
      bodyParser    = require('body-parser'),
      path          = require('path'),
      passport      = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      User          = require('../models/user');
      Temp          = require('../db/temp-storage')
      Mailer        = require('../emailer/mailer');
// user is name, pass, email
//
/*
  - login screen = [website]/login
    + default/home screen for app
  - successful login then proceeds to
    [website]/user/userName

  - '/login'
    + POST: enter user name and password
    + GET: loads user profile
  - '/login/user'
    + POST: enter user name, pass, email
*/
var Storage = new Temp.Storage();
var router = express.Router();
// body parser not necessary?
var parser = bodyParser.json();
var upload = multer();
var route  = '/login';


passport.use(new LocalStrategy(
  function(username, password, done){
    // check the DB for existing user & valid password
    /*
    DBM.findUser({ username: username }, function(err, user){
      if(err){ return done(err) }

      if(!user){
        return done(null, false, {message: 'invalid user name'});
      }

      if(!user.validPassword(password)){
        return done(null, false, {message: 'Invalid Password'});
      }

      return done(null, user);
    });
    */
  }));

router.use(function(req, res, next){
    console.log('Routing to: Login');
    next();
});

/*
router.param('name', function(req, res, next, name){
    console.log('User name is ' + name);
    req.name = name;
    next();
});
*/

// necessary?
router.get('/', function(req, res, next){
    // loads login page
    //res.send('Login GET ' + req.name);

    //res.sendFile('/home/bammer/Desktop/delivery/static/index.html');
});

router.post('/', parser, function(req, res){
  /*
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login'.
                                   failureFlash: true });
  */

    console.log(req.body);
    res.send('Login POST');
});

router.post('/:user', upload.fields([]), function(req, res){
  // creates a temp user and stores in memory
  // { id: hash, name: username }
  var newUser = new Temp.User(req.body);
  console.log('Creating new user:', req.params.user);

  Mailer.transporter.sendMail(Mailer.done);

  Storage.addUser(newUser);
  console.log(Storage);

  res.end();
});


module.exports = {
    router: router,
    route:  route
};
