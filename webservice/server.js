var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var mongoose  = require('mongoose');

var env       = process.env.NODE_ENV || 'development'
var path      = require('./utils/path.js')
var envConfig = require(path.config + '/env')[env]

mongoose.connect(envConfig.mongoUrl);

var app = express();

// parse application/json
app.use(bodyParser.json())

app.all('*', function(req, res, next) {
  if (env !== 'test' && envConfig.allowedDomains.indexOf(req.get('Origin')) === -1){
    return res.sendStatus(401);
  }

  res.header("Access-Control-Allow-Origin", req.get('Origin'));
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  next();
 });

require('./routes.js')(app)

//mongoose.connect('mongodb://lol-stats-mongoservice/test');

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});