const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
app.options('*', cors);
const io = require('socket.io')(8000)
const users = {};
io.on('connection', socket => {
    socket.on('newone-joined', name => {
        console.log('User joined', name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);

    })
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    })
    socket.on('disconnect', message => {
        socket.broadcast.emit('leave', users[socket.io]
        );
        delete users[socket.id];
    })
})


