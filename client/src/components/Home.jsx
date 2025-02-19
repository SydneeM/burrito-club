import { useNavigate } from 'react-router'
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

function Home() {
  let navigate = useNavigate();

  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => navigate('/about')}>Go to About Page</button>
    </div>
  )
}

export default Home
