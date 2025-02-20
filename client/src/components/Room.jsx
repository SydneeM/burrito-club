import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router'
import { Button, Input } from '@headlessui/react'

function Room({ socket }) {
  const [roomMessages, setRoomMessages] = useState([]);
  const [message, setMessage] = useState('');
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
    }

    socket.on('receive_message', handleReceiveMessage);
    socket.on('room_users', handleRoomUsers);

    return () => {
      socket.off('receive_message', handleReceiveMessage);
      socket.off('room_users', handleRoomUsers);
    };
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [roomMessages]);

  return (
    <div className='ring-1 h-[95vh]'>
      <div className='ring-1'>
        <h1 className='p-8'>{room} Club</h1>
      </div>
      <div className='flex flex-row ring-1'>
        <div className='flex flex-col ring-1 w-1/3'>
          <div>Restaurant of the Week</div>
          <div>Restaurant/Payer History</div>
          <div>Current Room Members</div>
        </div>
        <div className='flex flex-col ring-1 ring-blue-400 w-2/3'>
          <div className='ring-1 h-160 overflow-y-scroll scroll-auto'>
            {roomMessages.map((messageInfo) => (
              <div
                className='flex flex-col gap-y-2 ring-blue-400 ring-2 p-2 m-4'
                key={`${messageInfo.username}-${messageInfo.time}`}
              >
                <span>{messageInfo.username}</span>
                <span>{messageInfo.time}</span>
                <span>{messageInfo.message}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className='ring-1 flex flex-row'>
            < Input
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Room
