const io = require('socket.io-client');
const socket = io.connect('http://beak.tech:80', {reconnect: true});
const datetime = require('node-datetime');

var stdin = process.stdin, stdout = process.stdout;

var usernameSet = false;
var username = '';

stdin.resume();
stdout.write('Enter Username: ');

stdin.addListener('data', function(d) {
  if(usernameSet){
    var msg = {
      user: username,
      contents: d.toString().trim()
    }
    socket.emit('message', msg);
  }else{
    username = d.toString().trim();
    usernameSet = true;

    socket.on('connect', function (socket) {
        log('Connected to server.');
    });

    socket.on('disconnect', function (socket) {
        log('Disconnected from server.');
    });

    socket.on('message', function(message){
      if(message.user !== username){
        alertTerminal();
      }
      log(message.user + ' : ' + message.contents);
    });
  }
});

function log (msg) {
  var time = datetime.create().format('m-d-y H:M:S');
  console.log('[' + time + '] ' + msg);
}

function alertTerminal(){
  console.log("\007");
}
