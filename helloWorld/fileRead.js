var fs = require('fs');

fs.readFile('abc.txt', 'utf8', function (err, data) {
  if(err) throw err;
  console.log(data);
});
