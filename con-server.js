//server.js
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const datetime = require('node-datetime');
const sp = reqire('schemapack');

var messageSchema = sp.build({
    user: "string",
    contents: "string"
});

io.on('connection', function (socket){
  log('connection');
  socket.on('message', function (msg) {
    log(msg.user + ': ' + msg.contents);
    io.emit('message', msg);
  });
});

http.listen(80, '0.0.0.0', function() {
  log('> Started server on *:80');
});

function log (msg) {
  var time = datetime.create().format('m-d-y H:M:S');
  console.log('[' + time + '] ' + msg);
}
