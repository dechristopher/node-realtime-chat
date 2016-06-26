var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html');
});

function makeUID() {
    var user = '';
    var chrs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
        user += chrs.charAt(Math.floor(Math.random() * chrs.length));
    }
    return user;
}

io.on('connection', function (socket) {
    var user = makeUID();
    console.log('+> ' + user + ' has connected');

    socket.on('message.sent', function (message) {
        console.log('>> ' + user + ' : \"' + message + '\"');
        io.emit('message', user + ' : ' + message);
    });

    socket.on('disconnect', function () {
        console.log('-> ' + user + ' has disconnected');
        io.emit('message', 'User ' + user + ' has disconnected.');
    });

    io.emit('message', 'User ' + user + ' has connected.');
});

http.listen(3000, '0.0.0.0', function () {
    console.log(':> Started server.\n');
});
