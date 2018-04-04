var http = require('http');

var server = http.createServer(function (req, res){
  if(req.url == '/'){
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({message : 'Hello World'}));
    res.end();
  }
  else{
    res.end('Invalid Request!');
  }
});
server.listen(4000);
console.log('Node.js web server running in port 4000...');
