import { useEffect } from 'react';
import { useLocation } from 'react-router'

function Room({ socket }) {
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
    </div >
  )
}

export default Room
