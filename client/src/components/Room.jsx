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
      setRoomMessages((messages) => [...messages, data]);
    }

    const handleRoomUsers = (data) => {
      setRoomUsers(data);
    }

    const handleChooseRestaurant = (data) => {
      const { name, buyer } = data;
      setRestaurant(name);
      setBuyer(buyer);
    }

    const handleRestaurantHistory = (data) => {
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
    <div className='h-[95vh]'>
      <div className=''>
        <h2 className='p-8'>{room} Club</h2>
      </div>
      <div className='flex flex-row ring-1 py-4 gap-x-8'>
        <h2 className=''>Restaurant of the Week: {restaurant}</h2>
        <h2 className=''>Who&apos;s Paying: {buyer}</h2>
      </div>
      <div className='row row-flex my-4 justify-between'>
        <input
          className='p-3 w-2/5 ring-1'
          placeholder='Restaurant of the Week'
          onChange={(e) => setSuggestedRestaurant(e.target.value)}
        />
        <input
          className='p-3 w-2/5 ring-1'
          placeholder='Buyer'
          onChange={(e) => setSuggestedBuyer(e.target.value)}
        />
        <button
          className='p-3 w-1/5 ring-1'
          onClick={() => {
            if (suggestedRestaurant !== '' && suggestedRestaurant.trim().length !== 0 &&
              suggestedBuyer !== '' && suggestedBuyer.trim().length !== 0) {
              const time = Date.now();
              const state = { suggestedBuyer, suggestedRestaurant, room, time, };
              socket.emit('choose_restaurant', state);
            }
          }}>
          Enter
        </button>
      </div>
      <div className='flex flex-row ring-blue-500 ring-2 h-3/4'>
        <div className='flex flex-col w-1/3 ring-1'>
          <Users users={roomUsers} />
          <History restaurants={restaurantHistory} />
        </div>
        <div className='flex flex-col w-2/3 ring-1'>
          <Messages messages={roomMessages} />
          <div className='flex flex-row mb-4 mx-4 justify-between'>
            <input
              className='p-3 w-10/12 ring-1'
              placeholder='Message'
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className='p-3 w-2/12 min-w-fit ring-1'
              onClick={() => {
                if (message !== '' && message.trim().length !== 0) {
                  const time = Date.now();
                  const state = { message, username, room, time, };
                  socket.emit('send_message', state);
                }
              }}>
              Enter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Room
