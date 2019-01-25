const express = require("express");
const signUpController = require('../controllers/signup');
const utility = require('../controllers/utility');
const router = express();

router.post('/', function(req,res){
    var user = {};
    res.setHeader('Content-Type', 'application/json');
    if(!utility.isEmpty(req.body.email) && !utility.isEmpty(req.body.pass)){
        user.email = req.body.email;
        user.pass = req.body.pass;
        signUpController.sign_up(user, function(flag, msg){
            if(flag == true){
                res.send(JSON.stringify({msg : msg}));
            }
            else{
                res.send(JSON.stringify({msg : msg}));
            }
        });
    }
    else{
        res.status(400).send(JSON.stringify({msg : "Email or Password can't be empty!"}));
    }
});

module.exports = router;