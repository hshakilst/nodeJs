const AuthenticationController = require('./controllers/authentication'),  
      express = require('express'),
      passportService = require('./config/passport'),
      passport = require('passport'),
      path = require('path'),
      session = require('express-session'),
      formidable = require('formidable'),
      fs = require('fs');

const requireAuth = passport.authenticate('jwt', { session: false });  
const requireLogin = passport.authenticate('local', { session: false });

const REQUIRE_ADMIN = "Admin",  
      REQUIRE_OWNER = "Owner",
      REQUIRE_CLIENT = "Client",
      REQUIRE_MEMBER = "Member";

module.exports = function(app) {  
  // Initializing route groups
  const apiRoutes = express.Router(),
        authRoutes = express.Router();

  app.use(express.static(path.join(__dirname, 'public')));
  app.use(passport.initialize());
  app.use(session({secret : 'abcdefg', 
                 saveUninitialized: true,
                 resave: true}));
  app.use(passport.session());


  //=========================
  // Auth Routes
  //=========================

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes);

  // Registration route
  authRoutes.post('/register', AuthenticationController.register);

  // Login route
  

  app.get('/login', function(req, res){
    res.sendFile(path.join(__dirname, 'views/login.html'));
  });

  function isAuthenticated(req,res,next){
   if(req.session.passport){
      if(req.session.passport.user){
        return next();
      }
   }
   else
      return res.redirect('/login');
  }

  app.get('/', isAuthenticated, function(req, res){

    res.redirect('/upload');
  });

  app.post('/login', passport.authenticate('local', {successRedirect: '/upload', failureRedirect: '/login'}));

  app.get('/upload',isAuthenticated, function(req, res, next){
    res.sendFile(path.join(__dirname, 'views/upload.html'));
  });

  app.post('/upload', isAuthenticated, function(req, res, next){

  // create an incoming form object
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    var dir = '/' + req.session.passport.user._id;
    if(!fs.exists('./uploads'+dir)){
      fs.mkdir('./uploads'+dir);
    }
    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '/uploads'+dir);

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name

    form.on('file', function(field, file) {
      fs.rename(file.path, path.join(form.uploadDir, file.name));
    });

    // log any errors that occur
    form.on('error', function(err) {
      console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
      res.end('success');
    });

    // parse the incoming request containing the form data
    form.parse(req);

  });

  app.get('/files', isAuthenticated, function(req, res, next){
    var dir = '/' + req.session.passport.user._id;
    if(!fs.exists('./uploads'+dir)){
      fs.mkdir('./uploads'+dir);
    }
    app.use('/files', express.static(path.join(__dirname, 'uploads'+dir)));
  });
// Set url for API group routes
  app.use('/api', apiRoutes);
};