import { useLocation } from 'react-router'

function Room() {
  const { state } = useLocation();
  const { username, room } = state;

  return (
    <div className='flex flex-col gap-y-4'>
      <h1 className='p-4'>{username}</h1>
      <h1 className='p-4'>{room}</h1>
    </div >
  )
}

export default Room
