const express = require('express');

const toProfile = require('./routes/profile-route');

var port = 8080;
var app = express();

app.use(express.static('static'));
app.use(toProfile.route, toProfile.router);
app.use('*', function(req, res){
    res.status(404).send('404: File Not Found');
});

app.listen(8080, function(){
    console.log('\t**** Running @ http://localhost:' + port + ' ****\n');
});
