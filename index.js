var express = require('express');

var server = express();
server.use('/fonts', express.static(__dirname + '/dist/fonts'));
server.use('/images', express.static(__dirname + '/dist/images'));
server.use('/scripts', express.static(__dirname + '/dist/scripts'));
server.use('/styles', express.static(__dirname + '/dist/styles'));
server.use('/views', express.static(__dirname + '/dist/views'));

server.get('/*', function(req, res){
  res.sendFile(__dirname + '/dist/index.html');
});

var port = 80;
server.listen(port, function() {
  console.log('server listening on port ' + port);
});
