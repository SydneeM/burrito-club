import { memo } from 'react';
import { useNavigate } from 'react-router';

const Users = memo(function Users({ socket, curRoom, curUser, users }) {
  const navigate = useNavigate();

  return (
    <div className='h-1/3 card'>
      {/* <div className='flex flex-row gap-x-2'>
        <h1 className='text-left'>Hello {curUser}</h1>
        <button
          className='min-w-fit ring-1'
          onClick={() => {
            const state = { username: curUser, room: curRoom };
            socket.emit('leave_room', state);
            navigate('/', { replace: true });
          }}>
          Leave
        </button>
      </div> */}
      <h2 className=''>Current Members</h2>
      <ul className='mx-4'>
        {users.map((user) => (
          <li key={user} className='text-left mx-4'>{user}</li>
        ))}
      </ul>
    </div>
  );
});

export default Users
