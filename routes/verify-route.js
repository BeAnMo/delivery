/*********************************************************/
/******** User Verification Route ************************/
const express = require('express'),
      Mailer  = require('../emailer/mailer'),
      Temp    = require('../db/temp-storage');


var route = '/verify';
var router = express.Router();


router.use(function(req, res, next){
    console.log('Routing to: Verification');
    next();
});

router.get('/:user', function(req, res){
  // user has clicked verification link
  // user info entered into DB
  // user logs in
  console.log('verified user: [user name]');
});
