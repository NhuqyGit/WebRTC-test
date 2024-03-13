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

// Server-side
const connections = []; // Danh sách kết nối

io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Thêm socket mới vào danh sách kết nối
  connections.push(socket);

  socket.on('disconnect', () => {
    console.log('User disconnected');
    // Xóa socket khỏi danh sách khi ngắt kết nối
    const index = connections.indexOf(socket);
    if (index !== -1) {
      connections.splice(index, 1);
    }
  });

  socket.on('offer', (offer) => {
    // Gửi offer cho tất cả các kết nối
    connections.forEach(conn => {
      if (conn !== socket) { // Loại bỏ kết nối hiện tại
        conn.emit('offer', offer);
      }
    });
  });

  socket.on('answer', (answer) => {
    // Gửi answer cho tất cả các kết nối
    connections.forEach(conn => {
      if (conn !== socket) { // Loại bỏ kết nối hiện tại
        conn.emit('answer', answer);
      }
    });
  });

  socket.on('icecandidate', (icecandidate) => {
    // Gửi ice candidate cho tất cả các kết nối
    connections.forEach(conn => {
      if (conn !== socket) { // Loại bỏ kết nối hiện tại
        conn.emit('icecandidate', icecandidate);
      }
    });
  });
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
