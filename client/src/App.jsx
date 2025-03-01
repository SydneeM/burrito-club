import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './components/Home'
import Room from './components/Room'
import { io } from 'socket.io-client'

const socket = io.connect('https://localhost:4000');

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home socket={socket} />} />
        <Route path='room' element={<Room socket={socket} />} />
      </Routes>
    </Router>
  )
}

export default App
