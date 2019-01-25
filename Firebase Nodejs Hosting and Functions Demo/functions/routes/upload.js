const express = require('express');
const utility = require('../controllers/utility');
const router = express();

router.post('/', function(req, res){
    utility.uploadFile(req.files[0].buffer, req.files[0].originalname, function(flag, msg){
        if(flag === true){
            res.end(JSON.stringify({msg: msg}));
        }
        else{
            res.end(JSON.stringify({msg: msg}));
        }
    }
)});

module.exports = router;
