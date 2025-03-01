import { memo } from 'react';

const Users = memo(function Users({ socket, curRoom, curUser, users }) {
  return (
    <div>
      <h3>Current Members</h3>
      <ul>
        {users.map((user) => (
          <li key={user} className='text-left mx-4'>{user}</li>
        ))}
      </ul>
    </div>
  );
});

export default Users
