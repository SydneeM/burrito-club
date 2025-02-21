function Users({ users }) {
  return (
    <div className='flex flex-col'>
      <h2 className='self-start'>Current Members:</h2>
      <ul className='self-start'>
        {users.map((user) => (
          <li key={user} className='self-start text-left'>{user}</li>
        ))}
      </ul>
    </div>
  );
}

export default Users
