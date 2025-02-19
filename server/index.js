const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on('join_room', (data) => {
    const { username, room } = data;
    socket.join(room);

    // Sends message to all sockets excluding sender, io.to for all sockets
    const messageTime = Date.now();
    socket.to(room).emit('receive_message', {
      message: `${username} has joined the chat room`,
      username: 'Server',
      messageTime,
    });
  });
});

server.listen(4000);
