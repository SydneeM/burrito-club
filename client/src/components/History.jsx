function History({ restaurants }) {
  return (
    <div className='md:h-1/3 card'>
      <h2 className=''>Restaurant History</h2>
      <div className='text-left flex flex-row overflow-x-scroll'>
        <span className='w-1/3'>Restaurant</span>
        <span className='w-1/3'>Buyer</span>
        <span className='w-1/3'>Date</span>
      </div>
      <ul className=''>
        {restaurants.map((restaurant) => (
          <li key={`${restaurant.name}-${restaurant.time}`} className='text-left flex flex-row overflow-x-scroll'>
            <span className='w-1/3'>{restaurant.name}</span>
            <span className='w-1/3'>{restaurant.buyer}</span>
            <span className='w-1/3'>{new Date(restaurant.time).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History
