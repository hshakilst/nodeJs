const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    config = require('./config/main'),
    mongoose = require('mongoose'),
    router = require('./router'),
    cookieParser = require('cookie-parser');  

mongoose.connect(config.database);
app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json()); 
app.use(cookieParser());


/*app.use(function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});*/

const server = app.listen(config.port);
console.log('Your server is running on port ' + config.port + '.');
router(app);
