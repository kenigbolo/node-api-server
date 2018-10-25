const http = require('http');
const url = require('url');
const server = http.createServer();

server.on('request', (request, response) => {
  response.writeHead(200, {'Content-Type': 'application/json'});
  const query = url.parse(request.url, true).path;
  http.get('http://api.fixer.io' + query, (res) => {
    let buffer = "";
    res.on('data', (chunk) => {
      buffer += chunk;
    });

    res.on('end', () => {
      response.write(buffer);
      response.end();
    });
  });
});
const port = process.env.PORT || 8080;
server.listen(port);
console.log("Listening on port " + port + "......")

module.exports = server
