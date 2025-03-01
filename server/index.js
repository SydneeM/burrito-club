import './loadEnv.js';
import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import Message from './models/message.js';
import Restaurant from './models/restaurant.js';

const app = express();
app.use(cors());

const uri = process.env.ATLAS_URI || '';
mongoose.connect(uri);

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

  socket.on('join_room', async (data) => {
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

    const dbMessages = await Message.find({ room }).limit(50);
    io.to(room).emit('load_messages', dbMessages);

    const dbRestaurants = await Restaurant.find({ room }).limit(25).sort({ time: 'desc' });
    io.to(room).emit('load_restaurants', dbRestaurants);
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

  socket.on('send_message', async (data) => {
    const { message, username, room, time } = data;
    io.to(room).emit('receive_message', {
      message,
      username,
      time,
    });

    const newMessage = new Message({
      message,
      username,
      room,
      time,
    });
    await newMessage.save();
  });

  socket.on('choose_restaurant', async (data) => {
    const { buyer, restaurant, room, time } = data;
    io.to(room).emit('restaurant_info', {
      buyer,
      name: restaurant,
      time,
    });

    const newRestaurant = new Restaurant({
      buyer,
      name: restaurant,
      room,
      time,
    });
    await newRestaurant.save();
  });
});

server.listen(4000);
