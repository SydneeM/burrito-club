import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'

const rooms = [
  { id: 1, name: 'Burrito' },
  { id: 2, name: 'Other' }
]

function Home({ socket }) {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState(rooms[0]);
  let navigate = useNavigate();

  return (
    <div className='flex h-screen ring-1'>
      <div className='flex flex-col gap-y-4 m-auto'>
        <h1 className=''>Join the Club</h1>
        <input
          className='ring-1'
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <Listbox value={room} onChange={setRoom}>
          <ListboxButton className='ring-1'>{room.name}</ListboxButton>
          <ListboxOptions anchor="bottom">
            {rooms.map((room) => (
              <ListboxOption key={room.id} value={room}>
                {room.name}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
        <button
          className='ring-1'
          onClick={() => {
            if (username !== '' && username.trim().length !== 0 && room.name !== '') {
              const state = { username, room: room.name };
              socket.emit('join_room', state);
              navigate('/room', { replace: true, state });
            }
          }}>
          Enter
        </button>
      </div>
    </div >
  );
}

export default Home
