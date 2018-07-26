var express = require('express');
var app = express();
var mysql = require('mysql');
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var local_ip = require('./config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
})
app.use(require('./controllers'));

var io = require('socket.io')(http);

app.listen(80, local_ip.port, function () {
    console.log('Node server running at ip: ' + local_ip.port);
});

var users = [];

io.on('connection', (socket) => {
    console.log('User ' + socket.id + ' connected');
    socket.on('init-user', () => {
        users.push(socket.id);
        io.sockets.emit('users', users);
    });
    socket.on('disconnect', function () {
        var index = users.indexOf(socket.id);
        if (index > -1) {
            users.splice(index, 1);
            io.sockets.emit('users', users);
        }
        console.log('User ' + socket.id + ' disconnected');
    });

    socket.on('add-message', (obj) => {
        const timeStamp = new Date().getTime();
        console.log(obj);
        io.emit('message', {
            id_user: obj.id_user,
            text: obj.message,
            avatar: obj.avatar,
            time: timeStamp,
            name: obj.name
        });
    });

});
http.listen(5000, () => {
    console.log('Server started on port 5000');
});