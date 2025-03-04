import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'

const rooms = [
  { id: 1, name: 'Burrito' },
  // { id: 2, name: 'Other' }
]

function Home({ socket }) {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState(rooms[0]);
  const navigate = useNavigate();

  return (
    <div className='flex h-screen ring-1'>
      <div className='flex flex-col gap-y-4 m-auto'>
        <h1 className='text-5xl text-nowrap'>Join the Club</h1>
        <input
          className='w-80 p-3 rounded-xl focus:outline-0'
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <Listbox value={room} onChange={setRoom}>
          <ListboxButton className='w-80 text-start p-3 rounded-xl bg-white hover:cursor-pointer'>{room.name}</ListboxButton>
          <ListboxOptions className='w-80 rounded-xl bg-[#cbe0f4]' anchor='bottom'>
            {rooms.map((room) => (
              <ListboxOption
                className='hover:bg-white/50 hover:cursor-pointer p-3 rounded-xl m-2'
                key={room.id}
                value={room}
              >
                {room.name}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
        <button
          className='p-3 w-80 rounded-xl submit-btn'
          onClick={() => {
            if (username !== '' && username.trim().length !== 0 && room.name !== '') {
              sessionStorage.setItem('username', username);
              sessionStorage.setItem('room', room.name);
              socket.emit('join_room', {
                username,
                room: room.name,
              });
              navigate('/room', { replace: true });
            }
          }}>
          Enter
        </button>
      </div>
    </div >
  );
}

export default Home
