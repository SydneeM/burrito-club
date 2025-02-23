import { useState, useEffect } from 'react';
import { useLocation } from 'react-router'
import Users from './Users';
import History from './History';
import Messages from './Messages';

function Room({ socket }) {
  const [roomMessages, setRoomMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [roomUsers, setRoomUsers] = useState([]);
  const [suggestedRestaurant, setSuggestedRestaurant] = useState('');
  const [suggestedBuyer, setSuggestedBuyer] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [restaurantHistory, setRestaurantHistory] = useState([]);
  const [buyer, setBuyer] = useState('');

  const { state } = useLocation();
  const { username, room } = state;

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      console.log('Received message');
      setRoomMessages((messages) => [...messages, data]);
    }

    const handleRoomUsers = (data) => {
      console.log('Updated room users');
      setRoomUsers(data);
    }

    const handleChooseRestaurant = (data) => {
      console.log('Set restaurant');
      const { name, buyer } = data;
      setRestaurant(name);
      setBuyer(buyer);
    }

    const handleRestaurantHistory = (data) => {
      console.log('Updated restaurant history');
      setRestaurantHistory(data);
    }

    socket.on('receive_message', handleReceiveMessage);
    socket.on('room_users', handleRoomUsers);
    socket.on('restaurant_info', handleChooseRestaurant);
    socket.on('restaurant_history', handleRestaurantHistory);

    return () => {
      socket.off('receive_message', handleReceiveMessage);
      socket.off('room_users', handleRoomUsers);
      socket.off('restaurant_info', handleChooseRestaurant);
      socket.off('restaurant_history', handleRestaurantHistory);
    };
  }, [socket]);

  return (
    <div className='h-[95vh] flex flex-col'>
      <div className=''>
        <h1 className='p-8 m-8 font-bold text-6xl'>{room} Club</h1>
      </div>
      <div className='flex flex-row py-4 gap-x-8 rounded-3xl m-4' id='chosen-restaurant'>
        <h2 className=''>Restaurant of the Week: {restaurant}</h2>
        <h2 className=''>Who&apos;s Paying: {buyer}</h2>
      </div>
      <div className='flex flex-row justify-between gap-x-2 rounded-3xl m-4'>
        <input
          className='p-3 w-2/5 rounded-3xl'
          id='restaurant-input'
          placeholder='Restaurant of the Week'
          onChange={(e) => setSuggestedRestaurant(e.target.value)}
        />
        <input
          className='p-3 w-2/5 rounded-3xl'
          id='buyer-input'
          placeholder='Buyer'
          onChange={(e) => setSuggestedBuyer(e.target.value)}
        />
        <button
          className='p-3 w-1/5 rounded-3xl'
          id='restaurant-btn'
          onClick={() => {
            if (suggestedRestaurant !== '' && suggestedRestaurant.trim().length !== 0 &&
              suggestedBuyer !== '' && suggestedBuyer.trim().length !== 0) {
              const time = Date.now();
              const state = { suggestedBuyer, suggestedRestaurant, room, time, };
              socket.emit('choose_restaurant', state);
            }
          }}>
          Let's Eat
        </button>
      </div>
      <div className='flex flex-row h-3/4'>
        <div className='flex flex-col w-1/3'>
          <Users socket={socket} curRoom={room} curUser={username} users={roomUsers} />
          <History restaurants={restaurantHistory} />
        </div>
        <div className='flex flex-col w-2/3 rounded-3xl m-4' id='messaging-area'>
          <Messages messages={roomMessages} curUser={username} />
          <div className='flex flex-row mx-4 justify-between gap-x-2'>
            <input
              className='p-3 w-10/12 rounded-3xl my-4'
              id='msg-input'
              placeholder='Message'
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className='p-3 w-2/12 min-w-fit rounded-3xl my-4'
              id='send-msg-btn'
              onClick={() => {
                if (message !== '' && message.trim().length !== 0) {
                  const time = Date.now();
                  const state = { message, username, room, time, };
                  socket.emit('send_message', state);
                }
              }}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Room
