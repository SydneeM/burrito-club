import { useState, useEffect } from 'react';
import { useLocation } from 'react-router'
import { Button, Input } from '@headlessui/react'

function Room({ socket }) {
  const [message, setMessage] = useState('');
  const { state } = useLocation();
  const { username, room } = state;

  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log('received message:', data);
    });

    socket.on('room_users', (data) => {
      console.log('room users:', data);
    });
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
