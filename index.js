const express = require('express'),
      DBM     = require('./db/db');

// testing
const conf = require('./app-config');

const toProfile = require('./routes/profile-route');
const toLogin   = require('./routes/login-route');

var port = 8080;
var app = express();

app.use(express.static('static'));

app.use(toProfile.route, toProfile.router);
app.use(toLogin.route, toLogin.router);

app.use('*', function(req, res){
    res.status(404).send('404: File Not Found');
});

DBM.database.serialize(function(){
  // check if db exists? it should when server goes live
  // need to check if user table exists:
  //   SELECT name FROM sqlite_master WHERE
  //   type='table' AND name='users';
  DBM.tablePresent('users', function(err, row){
    if(err) return console.log(err);

    if(row.name === 'users'){
      return console.log('TABLE "users" exists');
    } else {
      return DBM.userTable();
    }
  });
});

app.listen(conf.server.port, function(){
    console.log('\t**** Running @ http://localhost:' + port + ' ****\n');
});
