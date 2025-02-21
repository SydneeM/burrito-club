function History({ restaurants }) {
  return (
    <div className='flex flex-col'>
      <h2 className='self-start'>Restaurant History:</h2>
      <ul className='self-start'>
        {restaurants.map((restaurant) => (
          <li key={`${restaurant.name}-${restaurant.time}`} className='self-start text-left'>
            <span>{restaurant.name}</span>
            <span>{restaurant.buyer}</span>
            <span>{restaurant.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History
