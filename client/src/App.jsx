import { Routes, Route } from 'react-router'
import './App.css'
import Home from './components/Home'
import Room from './components/Room'
import { io } from 'socket.io-client'

const socket = io.connect('http://localhost:4000');

function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Home />} />
        <Route path='room' element={<Room />} />
      </Routes>
    </div>
  )
}

export default App
