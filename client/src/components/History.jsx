function History({ restaurants }) {
  return (
    <div className='md:h-1/3 card overflow-y-scroll'>
      <h2 className=''>Restaurant History</h2>
      <div className="flex flex-col">
        <div className='grid grid-cols-3 text-start'>
          <span className='font-semibold text-lg'>Restaurant</span>
          <span className='font-semibold text-lg'>Buyer</span>
          <span className='font-semibold text-lg'>Date</span>
        </div>
        {restaurants.map((restaurant) => (
          <div key={`${restaurant.name}-${restaurant.time}`} className='grid grid-cols-3 text-start' id='history'>
            <span className=''>{restaurant.name}</span>
            <span className=''>{restaurant.buyer}</span>
            <span className=''>{new Date(restaurant.time).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History
