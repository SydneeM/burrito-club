import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const restaurantSchema = new Schema({
  buyer: String,
  name: String,
  room: String,
  time: Number,
});

const Restaurant = model('Restaurant', restaurantSchema);
export default Restaurant;
