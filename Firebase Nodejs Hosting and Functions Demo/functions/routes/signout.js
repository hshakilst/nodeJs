const express = require("express");
const signoutController = require('../controllers/signout');
const router = express();

router.get('/',function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.clearCookie('__session');
    signoutController.signout(req.cookies.__session || '', function(flag, msg){
        if(flag === true){
            res.status(200).send(JSON.stringify({msg : msg}));
        }
        else{
            res.status(401).send(JSON.stringify({msg : msg}));
        }
    });
});

module.exports = router;