import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

const app = express();
app.use(cors());

const server = createServer(app);
let users = [];

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User connected to socket ${socket.id}`);

  socket.on('join_room', (data) => {
    const { username, room } = data;
    socket.join(room);

    const curUser = {
      id: socket.id,
      username,
      room,
    };

    users.push(curUser);
    const usersInCurRoom = users.filter((user) => user.room === room).map((filteredUser) => filteredUser.username);
    io.to(room).emit('room_users', usersInCurRoom);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected from socket ${socket.id}`);
    const disconnectedUser = users.filter((user) => user.id === socket.id);

    if (disconnectedUser.length > 0) {
      const room = disconnectedUser[0].room;
      const updatedUsers = users.filter((user) => user.id !== socket.id);
      users = updatedUsers;
      const updatedUsersInCurRoom = updatedUsers.filter((user) => user.room === room).map((filteredUser) => filteredUser.username);
      io.to(room).emit('room_users', updatedUsersInCurRoom);
    }
  });

  socket.on('leave_room', (data) => {
    const { username, room } = data;
    socket.leave(room);
    const updatedUsers = users.filter((user) => user.id !== socket.id);
    users = updatedUsers;
    const updatedUsersInCurRoom = updatedUsers.filter((user) => user.room === room).map((filteredUser) => filteredUser.username);
    io.to(room).emit('room_users', updatedUsersInCurRoom);
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
    const { buyer, restaurant, room, time } = data;
    io.to(room).emit('restaurant_info', {
      buyer,
      name: restaurant,
      time,
    });
  });
});

server.listen(4000);
