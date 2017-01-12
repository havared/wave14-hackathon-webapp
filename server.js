var express = require('express');
var app = express();
const bodyParser = require('body-parser');
let green = require('./api/green.js');
let black = require('./api/black.js');
let doors = require('./api/doors.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/green', function(req, res){
  green.sendResponse(req,res);
});

app.get('/black', function(req, res){
  black.sendResponse(req,res);
});

app.post('/add', function(req,res){
  doors.insertData(req,res);
});

app.get('/find/:id', function(req,res){
  doors.find(req,res);
});

app.listen(3000);