const express = require("express");
const utility = require('../controllers/utility');
const signInController = require('../controllers/signin');
const router = express();

router.post('/', function(req, res){
    var user = {};
    res.setHeader('Content-Type', 'application/json');
    if(!utility.isEmpty(req.body.email) && !utility.isEmpty(req.body.pass)){
        user.email = req.body.email;
        user.pass = req.body.pass;
        signInController.signin(user, function(flag, msg){
            if(flag  === true){
                const expiresIn = 60 * 60 * 24 * 5 * 1000;
                const options = {maxAge: expiresIn, httpOnly: true, secure: false};
                res.cookie('__session', msg, options);
                res.status(200).end(JSON.stringify({msg : "Sign in Success!"}));
            }
            else{
                res.status(401).end(JSON.stringify({msg : msg}));
            }
        });
    }
    else{
        res.status(400).end(JSON.stringify({msg : "Email or Password can't be empty!"}));
    }
    
});

module.exports = router;