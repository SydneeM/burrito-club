import { useState } from 'react';
import { useNavigate } from 'react-router'

function Home() {
  const [username, setUsername] = useState('');
  let navigate = useNavigate();

  const handleNameChange = (value) => {
    console.log('name:', value);
    setUsername(value);
  }

  return (
    <div className='flex flex-col gap-y-4'>
      <h1 className='p-4'>Join the Club</h1>
      <input
        className='bg-[#1a1a1a] p-3 rounded-md'
        placeholder='Username'
        onChange={(e) => handleNameChange(e.target.value)}
      />
      <button onClick={() => navigate('/about')}>Enter</button>
    </div >
  )
}

export default Home
