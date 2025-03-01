import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const messageSchema = new Schema({
  message: String,
  username: String,
  room: String,
  time: Number,
});

const Message = model('Message', messageSchema);
export default Message;
