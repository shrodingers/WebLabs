/**
 * Created by Admin123 on 2016-11-30.
 */
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
app.use(express.static('./'));

var users=[];

console.log('ok');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
    console.log('connect');
});

io.on('connection',function (socket) {
    socket.on('new user',function (data, callback) {
        callback(true);
        socket.name=data;
        users.push(socket.name);
        updateUsers();
    });
    function updateUsers() {
        io.sockets.emit('usernames',users);
    }
    socket.on('send message',function (data) {
        io.sockets.emit('new message', {
            message: data,
            name: socket.name
        });
    });

    socket.on('disconnect', function (data) {
        if(!socket.name) return;
        users.splice(users.indexOf(socket.name),1);
        updateUsers();
    });
});


server.listen(3000);
