var http = require('http')
var server = http.createServer();

server.on('request', function(request, response){
	response.writeHead(200, {'Content-Type': 'application/json'});
	var query = require('url').parse(request.url, true).path;

	var apiResponse = http.get('http://api.fixer.io' + query, function(res){
    var buffer = "",
    		data;
    res.on('data', function(chunk) {
 			buffer += chunk;
  	});
  	res.on('end', function(){
  		data = JSON.parse(buffer);
  	});
	});
	
	apiResponse.on("error", function(err){ 
    console.error(err.message);
	})

	response.end();
});

server.listen(8080);
console.log("Listening on port 8080......")