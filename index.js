var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var rpio = require('rpio');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('static'));

app.get('/', function(req, res) {
  if(!req.cookies) {
    res.sendFile(path.join(__dirname+'/login.html'));
  } else {
    res.sendFile(path.join(__dirname+'/index.html'));
  }
});

app.post('/auth', function(req, res) {
  var pw = req.body.password;

  if(pw === 'f0rg0tten.c0nquest') {
    res.cookie('loggedIn', 'true', {expires: new Date(253402300000000)});
    res.sendFile(path.join(__dirname+'/index.html'));
  } else {
    res.sendFile(path.join(__dirname+'/login.html'));
  }
});

app.get('/start', function(req, res) {
  rpio.open(7, rpio.OUTPUT);
  rpio.write(7, rpio.LOW);
  res.send('started');
});

app.get('/stop', function(req, res) {
  rpio.write(7, rpio.HIGH);
  res.send('stopped');
});

var server = app.listen(3333, function() {
  console.log('listening on port 3333');
});
