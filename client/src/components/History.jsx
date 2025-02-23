function History({ restaurants }) {
  return (
    <div className='flex flex-col h-1/2 overflow-scroll rounded-3xl m-4' id='history'>
      <h2 className='text-left font-semibold text-2xl m-4'>Restaurant History</h2>
      <ul className=''>
        {restaurants.map((restaurant) => (
          <li key={`${restaurant.name}-${restaurant.time}`} className='text-left'>
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
