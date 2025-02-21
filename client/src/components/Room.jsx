import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router'
import { Button, Input } from '@headlessui/react'

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
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setRoomMessages((messages) => [...messages, data]);
    }

    const handleRoomUsers = (data) => {
      console.log('room users:', data);
      setRoomUsers(data);
    }

    const handleChooseRestaurant = (data) => {
      console.log('restaurant:', data);
      const { name, buyer } = data;
      setRestaurant(name);
      setBuyer(buyer);
    }

    const handleRestaurantHistory = (data) => {
      console.log('restaurants:', data);
      setRestaurantHistory((restaurants) => [...restaurants, data]);
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

  useEffect(() => {
    scrollToBottom();
  }, [roomMessages]);

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
        < Input
          className='bg-[#1a1a1a] p-3 rounded-md w-2/5'
          placeholder='Restaurant of the Week'
          onChange={(e) => setSuggestedRestaurant(e.target.value)}
        />
        < Input
          className='bg-[#1a1a1a] p-3 rounded-md w-2/5'
          placeholder='Buyer'
          onChange={(e) => setSuggestedBuyer(e.target.value)}
        />
        <Button
          className='bg-[#1a1a1a] p-3 rounded-md w-1/5'
          onClick={() => {
            if (suggestedRestaurant !== '' && suggestedRestaurant.trim().length !== 0 &&
              suggestedBuyer !== '' && suggestedBuyer.trim().length !== 0) {
              const time = Date.now();
              const state = { suggestedBuyer, suggestedRestaurant, room, time };
              socket.emit('choose_restaurant', state);
            }
          }}>
          Enter
        </Button>
      </div>
      <div className='flex flex-row'>
        <div className='flex flex-col w-1/3 ring-1'>
          <div className='flex flex-col'>
            <h2 className='self-start'>Current Members:</h2>
            <ul className='self-start'>
              {roomUsers.map((user) => (
                <li key={user} className='self-start text-left'>{user}</li>
              ))}
            </ul>
          </div>
          <div className='flex flex-col'>
            <h2 className='self-start'>Restaurant History:</h2>
            <ul className='self-start'>
              {restaurantHistory.map((restaurant) => (
                <li key={`${restaurant.name}-${restaurant.time}`} className='self-start text-left'>
                  <span>{restaurant.name}</span>
                  <span>{restaurant.buyer}</span>
                  <span>{restaurant.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='flex flex-col w-2/3 ring-1'>
          <div className='h-160 overflow-y-scroll'>
            {roomMessages.map((messageInfo) => (
              <div
                className='flex flex-col p-2 m-4 ring-1'
                key={`${messageInfo.username}-${messageInfo.time}`}
              >
                <span>{messageInfo.username}</span>
                <span>{messageInfo.time}</span>
                <span>{messageInfo.message}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className='flex flex-row mb-4 mx-4 justify-between'>
            < Input
              className='bg-[#1a1a1a] p-3 rounded-md w-10/12'
              placeholder='Message'
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              className='bg-[#1a1a1a] p-3 rounded-md w-2/12'
              onClick={() => {
                if (message !== '' && message.trim().length !== 0) {
                  const time = Date.now();
                  const state = { message, username, room, time };
                  socket.emit('send_message', state);
                }
              }}>
              Enter
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Room
