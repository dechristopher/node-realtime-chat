var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  var user = Date.now();
  console.log('> ' + user + ' has connected');

  socket.on('message.sent', function (message) {
    console.log('-> ' + user + ' : \"' + message + '\"');
    io.emit('message', user + ' : ' + message);
  });

  io.emit('message', 'User ' + user + ' has connected.');
});

http.listen(80, '0.0.0.0', function () {
  console.log('Started server.');
});
