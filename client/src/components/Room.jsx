import { useState, useEffect } from 'react';
import Users from './Users';
import Choice from './Choice';
import ChoiceSender from './ChoiceSender';
import History from './History';
import Messages from './Messages';
import MessageSender from './MessageSender';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { StarIcon, ClockIcon, UsersIcon } from '@heroicons/react/24/outline';

function Room({ socket }) {
  const [roomMessages, setRoomMessages] = useState([]);
  const [roomUsers, setRoomUsers] = useState([]);
  const [restaurant, setRestaurant] = useState('');
  const [restaurantHistory, setRestaurantHistory] = useState([]);
  const [buyer, setBuyer] = useState('');
  const [username] = useState(() => {
    const storedUserame = sessionStorage.getItem('username');
    return storedUserame ? storedUserame : '';
  });
  const [room] = useState(() => {
    const storedRoom = sessionStorage.getItem('room');
    return storedRoom ? storedRoom : '';
  });

  useEffect(() => {
    const handleConnect = () => {
      console.log('Joined room');
      socket.emit('join_room', {
        username: username,
        room: room,
      });
    }

    const handleLoadMessages = (data) => {
      console.log('Loaded messsages');
      setRoomMessages(data);
    }

    const handleReceiveMessage = (data) => {
      console.log('Received message');
      setRoomMessages((messages) => [...messages, data]);
    }

    const handleRoomUsers = (data) => {
      console.log('Updated room users');
      setRoomUsers(data);
    }

    const handleLoadRestaurants = (data) => {
      console.log('Loaded restaurants');
      setRestaurantHistory(data);
      if (data.length > 0) {
        setRestaurant(data[0].name);
        setBuyer(data[0].buyer);
      }
    }

    const handleChooseRestaurant = (data) => {
      console.log('Set restaurant');
      const { name, buyer } = data;
      setRestaurant(name);
      setBuyer(buyer);
      setRestaurantHistory((restaurants) => [data, ...restaurants]);
    }

    socket.on('connect', handleConnect);
    socket.on('load_messages', handleLoadMessages);
    socket.on('receive_message', handleReceiveMessage);
    socket.on('room_users', handleRoomUsers);
    socket.on('load_restaurants', handleLoadRestaurants);
    socket.on('restaurant_info', handleChooseRestaurant);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('load_messages', handleLoadMessages);
      socket.off('receive_message', handleReceiveMessage);
      socket.off('room_users', handleRoomUsers);
      socket.off('load_restaurants', handleLoadRestaurants);
      socket.off('restaurant_info', handleChooseRestaurant);
    };
  }, [socket, room, username]);

  return (
    <div className='flex flex-col md:flex-row md:gap-x-10 gap-y-4 h-screen'>
      <div className='flex flex-col'>
        <TabGroup className='h-full'>
          <div className='flex flex-col md:flex-row md:gap-x-10 gap-y-4 h-full'>
            <TabList className='flex flex-row md:flex-col gap-x-4 md:gap-y-4 p-4 md:px-10 bg-[#faf9f6]'>
              <h1 className='hidden md:block text-start text-5xl text-nowrap'>{`${room} Club`}</h1>
              <h3 className='hidden md:block text-nowrap'>{`Hello ${username}`}</h3>
              <Tab className='flex flex-row gap-x-2 items-center menu-btn data-[selected]:bg-[#c7c9e0] p-2 bg-[#9bc4e0] rounded-md'>
                <StarIcon className='size-8' />
                <div className='hidden sm:block text-nowrap menu-text'>Choice</div>
              </Tab>
              <Tab className='flex flex-row gap-x-2 items-center menu-btn data-[selected]:bg-[#c7c9e0] p-2  bg-[#9bc4e0] rounded-md'>
                <ClockIcon className='size-8' />
                <div className='hidden sm:block text-nowrap menu-text'>History</div>
              </Tab>
              <Tab className='flex flex-row gap-x-2 items-center menu-btn data-[selected]:bg-[#c7c9e0] p-2  bg-[#9bc4e0] rounded-md'>
                <UsersIcon className='size-8' />
                <div className='hidden sm:block text-nowrap menu-text'>Members</div>
              </Tab>
            </TabList>
            <div className='flex flex-col md:w-[30vw] md:my-10 gap-y-4 md:gap-y-10 w-full'>
              <TabPanels className='p-4 md:p-8 bg-[#faf9f6]/80 rounded-3xl md:grow md:overflow-y-auto md:max-h-3/5'>
                <TabPanel>
                  <Choice restaurant={restaurant} buyer={buyer} />
                </TabPanel>
                <TabPanel className='h-full'>
                  <History restaurants={restaurantHistory} />
                </TabPanel>
                <TabPanel>
                  <Users socket={socket} curRoom={room} curUser={username} users={roomUsers} />
                </TabPanel>
              </TabPanels>
              <div className='p-4 md:p-8 bg-[#faf9f6]/80 rounded-3xl md:grow max-h-40 md:max-h-none overflow-y-auto'>
                <h3>Restaurant Selection</h3>
                <ChoiceSender socket={socket} curRoom={room} />
              </div>
            </div>
          </div>
        </TabGroup>
      </div>
      <div className='flex flex-col grow bg-[#faf9f6]/80 rounded-3xl md:my-10 md:mr-10 p-4 md:p-8 overflow-y-auto'>
        <div className='flex flex-col h-full'>
          <Messages messages={roomMessages} curUser={username} />
          <MessageSender socket={socket} curRoom={room} curUser={username} />
        </div>
      </div>

    </div>
  );
}

export default Room
