const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);
const userInfo = []

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User connected on socket ${socket.id}`);

  socket.on('join_room', (data) => {
    const { username, room } = data;
    socket.join(room);

    // Sends message to all sockets excluding sender, io.to for all sockets
    const time = Date.now();
    socket.to(room).emit('receive_message', {
      message: `${username} has joined the chat room`,
      username: 'Server',
      time,
    });

    const curUser = { id: socket.id, username, room };
    userInfo.push(curUser);
    const usersInCurRoom = userInfo.filter((user) => user.room === room).map((filteredUser) => filteredUser.username);
    io.to(room).emit('room_users', usersInCurRoom);
  });

  socket.on('send_message', data => {
    const { message, username, room, time } = data;
    io.to(room).emit('receive_message', {
      message,
      username,
      time,
    });
  });

  socket.on('choose_restaurant', data => {
    const { suggestedBuyer, suggestedRestaurant, room } = data;
    io.to(room).emit('restaurant_info', {
      buyer: suggestedBuyer,
      restaurant: suggestedRestaurant,
    });
  });
});

server.listen(4000);
