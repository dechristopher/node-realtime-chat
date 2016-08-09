//server.js
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var datetime = require('node-datetime');

io.on('connection', function (socket){
  log('connection');
  socket.on('message', function (msg) {
    log(msg.user + ': ' + msg.contents);
    io.emit('message', msg);
  });
});

http.listen(3000, '0.0.0.0', function() {
  log('> Started server on *:3000\n');
});

function log (msg) {
  var time = datetime.create().format('m-d-y H:M:S');
  console.log('[' + time + '] ' + msg);
}