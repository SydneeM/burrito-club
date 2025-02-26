import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
      <div className='flex flex-col md:flex-row md:gap-x-6 gap-y-4 h-screen'>

        <div className='flex flex-col'>
          {/* <div className='p-2'>{`Hello ${username}`}</div> */}
          <TabGroup className='h-full'>
            <div className='flex flex-col md:flex-row md:gap-x-6 gap-y-4 h-full'>
              <TabList className='flex flex-row md:flex-col gap-x-4 md:gap-y-4 p-4 bg-[#282b31] rounded-xl'>
                <Tab className='flex flex-row gap-x-2'>
                  <StarIcon className='size-10 text-blue-500' />
                </Tab>
                <Tab className='flex flex-row gap-x-2'>
                  <ClockIcon className='size-10 text-blue-500' />
                </Tab>
                <Tab className='flex flex-row gap-x-2'>
                  <UsersIcon className='size-10 text-blue-500' />
                </Tab>
              </TabList>
              <TabPanels className='p-4 md:w-[25vw] w-full bg-[#282b31] rounded-xl'>
                <TabPanel>
                  <Choice restaurant={restaurant} buyer={buyer} />
                </TabPanel>
                <TabPanel>
                  <History restaurants={restaurantHistory} />
                </TabPanel>
                <TabPanel>
                  <Users socket={socket} curRoom={room} curUser={username} users={roomUsers} />
                </TabPanel>
              </TabPanels>
            </div>
          </TabGroup>
        </div>

        <div className='flex flex-col md:grow bg-[#282b31] rounded-xl'>
          {/* <div className='p-2'>{`${room} Chat`}</div> */}
          <div className='flex flex-col h-full overflow-auto'>
            <Messages messages={roomMessages} curUser={username} />
            <MessageSender socket={socket} curRoom={room} curUser={username} />
          </div>
        </div>

        <div className='flex flex-col md:w-[25vw] bg-[#282b31] rounded-xl'>
          {/* <div className='p-2'>Restaurant Selection</div> */}
          <ChoiceSender socket={socket} curRoom={room} />
        </div>

      </div>
  );
}

export default Room
