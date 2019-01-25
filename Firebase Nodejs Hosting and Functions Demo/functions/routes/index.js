const express = require("express");
const router = express();
const signInRoute = require('./signin');
const signUpRoute = require('./signup');
const signOutRoute = require('./signout');
const homeRoute = require('./home');
const uploadRoute = require('./upload');

router.use('/signin', signInRoute);
router.use('/signup', signUpRoute);
router.use('/signout', signOutRoute);
router.use('/home', homeRoute);
router.use('/upload', uploadRoute);

module.exports = router;