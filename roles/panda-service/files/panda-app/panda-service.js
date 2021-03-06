var fs = require('file-system');
var http = require('http');
var config = require('./config.json');
var dispatcher = require('httpdispatcher');

function handleRequest(request, response){
    try {
        console.log("Requested URL: " + request.url);
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

dispatcher.onGet("/small.png", function(req, res) {
    var img = fs.readFileSync('/tmp/panda-app/resources/small.png');
    res.writeHead(200, {'Content-Type': 'image/png'});
    res.end(img, 'binary');
});

dispatcher.onGet("/medium.png", function(req, res) {
    var img = fs.readFileSync('/tmp/panda-app/resources/medium.png'); 
    res.writeHead(200, {'Content-Type': 'image/png'});
    res.end(img, 'binary');
});

dispatcher.onError(function(req, res) {
        res.writeHead(404);
        res.end("404 - Page Does not exists");
});

http.createServer(handleRequest).listen(config.port, function(){
    console.log("Server listening on: http://localhost:%s", config.port);
});
