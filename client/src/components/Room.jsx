import { useState, useEffect } from 'react';
import { useLocation } from 'react-router'
import { Button, Input } from '@headlessui/react'

function Room({ socket }) {
  const [roomMessages, setRoomMessages] = useState([]);
  const [message, setMessage] = useState('');
  const { state } = useLocation();
  const { username, room } = state;

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setRoomMessages((messages) => [...messages, data]);
    }

    const handleRoomUsers = (data) => {
      console.log('room users:', data);
    }

    socket.on('receive_message', handleReceiveMessage);
    socket.on('room_users', handleRoomUsers);

    return () => {
      socket.off('receive_message', handleReceiveMessage);
      socket.off('room_users', handleRoomUsers);
    };
  }, [socket]);

  return (
    <div className='flex flex-col gap-y-4'>
      <h1 className='p-4'>{username}</h1>
      <h1 className='p-4'>{room}</h1>
      <Input
        className='bg-[#1a1a1a] p-3 rounded-md'
        placeholder='Message'
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button onClick={() => {
        if (message !== '') {
          const time = Date.now();
          const state = { message, username, room, time };
          socket.emit('send_message', state);
        }
      }}>
        Enter
      </Button>
    </div >
  )
}

export default Room
