var express    = require("express");
var mysql      = require('mysql');
var bodyParser = require("body-parser");
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'rest_db'
});
var app = express();

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn"+err);
}
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get("/persons",function(req,res){
connection.query('SELECT * from persons', function(err, results) {
  if (!err){
    res.json(results);
    res.end();
  }
  else{
    throw err;
    res.json({message : ""+err});
    res.end();
  }
  });
});

app.post("/persons",function(req, res){
  connection.query("INSERT INTO `persons` (`id`, `name`, `email`, `phone`, `address`)"+
  " VALUES (NULL, '"+req.body.name+"', '"+req.body.email+"', '"+req.body.phone+"', '"+req.body.address+"')",
  function(err, result){
    if(err){
      throw err;
      res.json({message : ""+err});
      res.end();
    }
    else{
      res.json({message : "Insert Success!"});
      res.end();
    }
  });
});

app.delete("/persons/:pid",function(req, res){
  connection.query("DELETE FROM persons WHERE id = ?",[req.params.pid],function(err, result){
    if(err){
      throw err;
      res.json({error : ""+err});
      res.end();
    }
    else{
      res.json({message : "Delete Success!"});
      res.end();
    }
  });
});

app.listen(3000,function(){
  console.log("Listening on port 3000");
});
