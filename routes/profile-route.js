const express    = require('express'),
      bodyParser = require('body-parser');
      Profile    = require('../models/profile');

var router = express.Router();
var parser = bodyParser.json();
var route  = '/user';
var param  = '/:name';

router.use(function(req, res, next){
    console.log('Routing to: Profile');
    next();
});

router.param('name', function(req, res, next, name){
    console.log('User name is ' + name);
    req.name = name;
    next();
});

router.get(param, function(req, res, next){
    // sends back profile info from DB

    res.send('Profile GET ' + req.name);
});

router.post(param, parser, function(req, res){
    // enters new profile into DB
    // AJAX from frontend with Profile prototype at SIGN UP
    // - profileName  = String
    // - companyName  = String
    // - locale       = String
    // - wage         = Number
    // - feeBase      = Number
    // - feeDecrement = Number
    // a new table is created for the profile in the DB
    // - as well as creating empty tables for shift/run/delivery
    console.log(req.body);
    res.send('Profile POST');
});

router.put(param, function(req, res, next){
    // updates DB with new profile information
    // possibly includes updating options
    res.send('Profile PUT');
});

router.delete(param, function(req, res, next){
    // deletes profile
    res.send('Profile DELETE');
});

module.exports = {
    router: router,
    route:  route
};
