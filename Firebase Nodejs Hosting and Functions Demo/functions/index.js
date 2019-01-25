const functions = require('firebase-functions');
const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const fileParser = require('express-multipart-file-parser');
const app = express();
const csrfMiddleware = csurf({
    cookie: true
  });
const routes = require('./routes/index');

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(fileParser);
//app.use(bodyParser.json());
app.use(function(req, res,next){
    res.setHeader('Cache-Control', 'private');
    next();
});
/*app.use(function(req,res,next){
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.locals.csrftoken = req.csrfToken();
    next();
});
//app.use(csrfMiddleware);*/
app.use('/', routes);

exports.app = functions.https.onRequest(app);
