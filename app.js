const http = require('http');
const url = require('url');
const FixerIO = require('fixer-io-utility');
const server = http.createServer();

/**
 * @example
 * This is an example of how the fixer IO utility class
 * can be leveraged to make requests to the API.
 * @example
 */
const fixerUtility = new FixerIO('put-your-api-key-here');
fixerUtility.request('latest').then((response) => {
  console.log(response);
});



server.on('request', (request, response) => {
  response.writeHead(200, {'Content-Type': 'application/json'});
  const query = url.parse(request.url, true).path;
  http.get('http://data.fixer.io' + query, (res) => {
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

module.exports = {FixerIO, server}
