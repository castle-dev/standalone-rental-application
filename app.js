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

server.set('port', process.env.PORT || 8000);
server.listen(server.get('port'), function() {
  console.log('server listening on port ' + server.get('port'));
});
