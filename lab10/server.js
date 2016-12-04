/**
 * Created by Admin123 on 2016-11-30.
 */
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var users=[];





server.listen(3000);


app.get('/',function (req, res) {
    res.sendFile(__dirname + '/index.html')
});
io.sockets.on('connection',function (socket) {
    socket.on('new user',function (data, callback) {
        callback(true);
        socket.name=data;
        users.push(socket.name);
        updateUsers();

    });
    function updateUsers() {
        io.sockets.emit('names',users);

    }
    socket.on('send message',function (data) {
        io.sockets.emit('new message',data);

    });

    socket.on('disconnect', function (data) {
        if(!socket.name) return;
        users.splice(users.indexOf(socket.name),1);
        updateUsers();
    });
});