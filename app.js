const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('offer', (data) => {
        const { targetSocketId, offer } = data;
        socket.to(targetSocketId).emit('offer', offer);
    });

    socket.on('answer', (data) => {
        const { targetSocketId, answer } = data;
        socket.to(targetSocketId).emit('answer', answer);
    });

    socket.on('icecandidate', (data) => {
        const { targetSocketId, icecandidate } = data;
        socket.to(targetSocketId).emit('icecandidate', icecandidate);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
