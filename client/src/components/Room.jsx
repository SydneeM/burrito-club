import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Users from './Users';
import Choice from './Choice';
import ChoiceSender from './ChoiceSender';
import History from './History';
import Messages from './Messages';
import MessageSender from './MessageSender';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { StarIcon, ClockIcon, UsersIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';

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
  const navigate = useNavigate();

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
        <TabGroup className='flex flex-col lg:flex-row h-screen w-screen'>
          <div className='flex flex-col lg:flex-row lg:gap-x-10 gap-y-4 h-full w-full'>
            <TabList className='flex flex-row lg:flex-col gap-x-4 lg:gap-y-4 p-4 lg:px-10 bg-[#faf9f6]'>
              <h1 className='hidden lg:block text-start text-5xl text-nowrap'>{`${room} Club`}</h1>
              <div className='flex flex-row justify-between'>
                <h3 className='hidden lg:block text-nowrap'>{`Hello ${username}`}</h3>
                <button
                  className='hover:cursor-pointer'
                  onClick={() => {
                    socket.emit('leave_room', { room });
                    navigate('/', { replace: true });
                  }}>
                  <ArrowLeftStartOnRectangleIcon className='size-6' />
                </button>
              </div>
              <div className='flex flex-col'>
              <Tab className='flex flex-row gap-x-2 items-center menu-btn data-[selected]:bg-[#cbe0f4]/50 p-2 rounded-lg hover:cursor-pointer'>
                <StarIcon className='size-6' />
                <div className='hidden sm:block text-nowrap menu-text'>Choice</div>
              </Tab>
              <Tab className='flex flex-row gap-x-2 items-center menu-btn data-[selected]:bg-[#cbe0f4]/50 p-2 rounded-lg hover:cursor-pointer'>
                <ClockIcon className='size-6' />
                <div className='hidden sm:block text-nowrap menu-text'>History</div>
              </Tab>
              <Tab className='flex flex-row gap-x-2 items-center menu-btn data-[selected]:bg-[#cbe0f4]/50 p-2 rounded-lg hover:cursor-pointer'>
                <UsersIcon className='size-6' />
                <div className='hidden sm:block text-nowrap menu-text'>Members</div>
              </Tab>
              </div>
            </TabList>
            <div className='flex flex-col lg:my-10 p-4 lg:p-8 bg-[#faf9f6]/80 rounded-3xl lg:overflow-y-auto lg:w-[50vw] grow lg:grow-0'>
              <Messages messages={roomMessages} curUser={username} />
              <MessageSender socket={socket} curRoom={room} curUser={username} />
            </div>
            <div className='flex flex-col lg:my-10 gap-y-4 lg:gap-y-10 lg:mr-10 overflow-x-auto grow'>
              <TabPanels className='p-4 lg:p-8 bg-[#faf9f6]/80 rounded-3xl lg:overflow-y-auto lg:max-h-3/5'>
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
              <div className='p-4 lg:p-8 bg-[#faf9f6]/80 rounded-3xl overflow-y-auto grow lg:grow-0'>
                <h3>Restaurant Selection</h3>
                <ChoiceSender socket={socket} curRoom={room} />
              </div>
            </div>
          </div>
        </TabGroup>
  );
}

export default Room
