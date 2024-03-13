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

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('offer', async (offer) => {
      try {
          await peerConnection.setRemoteDescription(offer);
          const answer = await peerConnection.createAnswer();
          await peerConnection.setLocalDescription(answer);
          socket.emit('answer', answer);
      } catch (error) {
          console.error('Error handling offer:', error);
      }
  });

  socket.on('answer', async (answer) => {
      try {
          await peerConnection.setRemoteDescription(answer);
      } catch (error) {
          console.error('Error handling answer:', error);
      }
  });

  socket.on('icecandidate', async (icecandidate) => {
      try {
          await peerConnection.addIceCandidate(icecandidate);
      } catch (error) {
          console.error('Error handling icecandidate:', error);
      }
  });

});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
