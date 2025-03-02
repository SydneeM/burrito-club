import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css'
import Home from './components/Home'
import Room from './components/Room'
import { io } from 'socket.io-client'

const socket = io.connect('https://10.0.0.61:4000');

function App() {
  useEffect(() => {
    const handleNotification = () => {
      if (!("Notification" in window)) {
        alert("This browser does not support system notifications!");
      }
      else if (Notification.permission === "granted") {
        new Notification("New message from Burrito Club", {
          body: "Notification"
        });
      }
      else if (Notification.permission !== "denied") {
        Notification.requestPermission((permission) => {
          if (permission === "granted") {
            new Notification("New message from Burrito Club", {
              body: "Notification"
            })
          }
        });
      }
    }

    socket.on('notify', handleNotification);

    return () => {
      socket.off('notify', handleNotification);
    };
  }, [socket]);

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
