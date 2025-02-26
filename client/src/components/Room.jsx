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
      <div className='flex flex-col md:flex-row md:gap-x-10 gap-y-4 h-screen'>

        <div className='flex flex-col'>
          <TabGroup className='h-full'>
            <div className='flex flex-col md:flex-row md:gap-x-10 gap-y-4 h-full'>
              <TabList className='flex flex-row md:flex-col gap-x-4 md:gap-y-4 p-4 md:px-10 border-b-1 md:border-r-1 border-gray-700'>
                <div className='items-center'>{`${room} Club`}</div>
                <div className='items-center'>{`Hello ${username}`}</div>
                <Tab className='flex flex-row gap-x-2 items-center'>
                  <StarIcon className='size-8 text-blue-500' />
                  <span className='hidden sm:block text-nowrap'>Restaurant of the Week</span>
                </Tab>
                <Tab className='flex flex-row gap-x-2 items-center'>
                  <ClockIcon className='size-8 text-blue-500' />
                  <span className='hidden sm:block text-nowrap'>Restaurant History</span>
                </Tab>
                <Tab className='flex flex-row gap-x-2 items-center'>
                  <UsersIcon className='size-8 text-blue-500' />
                  <span className='hidden sm:block text-nowrap'>Current Members</span>
                </Tab>
              </TabList>
              <div className='flex flex-col md:w-[30vw] md:my-10 gap-y-4 md:gap-y-10 w-full'>
                <TabPanels className='p-4 bg-[#282b31] rounded-3xl md:grow'>
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
                <div className='p-4 bg-[#282b31] rounded-3xl md:grow'>
                  <h3>Restaurant Selection</h3>
                  <ChoiceSender socket={socket} curRoom={room} />
                </div>
              </div>
            </div>
          </TabGroup>
        </div>

        <div className='flex flex-col grow bg-[#282b31] rounded-3xl md:my-10 md:mr-10'>
          {/* <div className='p-2'>{`${room} Chat`}</div> */}
          <div className='flex flex-col h-full overflow-auto'>
            <Messages messages={roomMessages} curUser={username} />
            <MessageSender socket={socket} curRoom={room} curUser={username} />
          </div>
        </div>

      </div>
  );
}

export default Room
