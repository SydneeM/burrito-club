import { useState } from 'react';
import { useNavigate } from 'react-router'
import { Button, Input, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'

const rooms = [
  { id: 1, name: 'Burrito' },
  { id: 2, name: 'Other' }
]

function Home() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState(rooms[0]);
  let navigate = useNavigate();

  const handleNameChange = (value) => {
    console.log('name:', value);
    setUsername(value);
  }

  return (
    <div className='flex flex-col gap-y-4'>
      <h1 className='p-4'>Join the Club</h1>
      <Input
        className='bg-[#1a1a1a] p-3 rounded-md'
        placeholder='Username'
        onChange={(e) => handleNameChange(e.target.value)}
      />
      <Listbox value={room} onChange={setRoom}>
        <ListboxButton>{room.name}</ListboxButton>
        <ListboxOptions anchor="bottom">
          {rooms.map((room) => (
            <ListboxOption key={room.id} value={room}>
              {room.name}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
      <Button onClick={() => navigate('/about')}>Enter</Button>
    </div >
  )
}

export default Home
