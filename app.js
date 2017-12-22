var http = require('http');
var url = require('url');
var server = http.createServer();

server.on('request', function(request, response){
  response.writeHead(200, {'Content-Type': 'application/json'});
  var query = url.parse(request.url, true).path;
  http.get('http://api.fixer.io' + query, function(res){
    var buffer = "";
    res.on('data', function(chunk) {
      buffer += chunk;
    });

    res.on('end', function(){
      response.write(buffer);
      response.end();
    });
  });
});
var port = process.env.PORT || 8080;
server.listen(port);
console.log("Listening on port " + port + "......")

module.exports = server
