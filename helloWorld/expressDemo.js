var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get("/", function (req, res){
  res.writeHead(200,{"Content-Type":"text/html"});
  res.write("<html><body><p>Helloooo</p></body></html>");
  res.end();
});

app.post("/post", function (req, res){
  if(req.body.user == "admin" && req.body.pass == "admin"){
    res.end("Success!");
  }
  else{
    res.end("Failed!")
  }
});

app.listen(3000, function (){
  console.log("Server started on port 3000");
});
