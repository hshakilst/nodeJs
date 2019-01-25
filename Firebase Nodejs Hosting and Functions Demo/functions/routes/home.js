const express = require('express');
const firebase = require('../controllers/init_firebase');
const admin = require('../controllers/init_admin');
const signIn = require('../controllers/signin');
const router = express();

router.get('/', function(req, res){
    signIn.verifySessionCookie(req.cookies.__session || '', function(flag, msg){
        if(flag === true){
            res.status(200).end(JSON.stringify({msg : "Hello "+ msg}));
        }
        else{
            res.status(401).end(JSON.stringify({msg: msg}));
        }
    });
});

module.exports = router;