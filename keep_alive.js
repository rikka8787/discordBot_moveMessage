var http = require('http')

http.createServer(function (req, res) {
  res.write("I'm alive");
  res.end();
});

server.listen(8080, function() {
  console.log('Server is running on http://localhost:8080');
});
