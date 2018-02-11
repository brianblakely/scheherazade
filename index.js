var path = require('path');
var express = require('express');
var rpio = require('rpio');

var app = express();

app.use(express.static('static'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/open', function(req, res) {
  rpio.open(7, rpio.OUTPUT);
  rpio.write(7, rpio.LOW);
  rpio.sleep(2);
  rpio.write(7, rpio.HIGH);
  res.send('success');
});

var server = app.listen(3333, function() {
  console.log('listening on port 3333');
});
