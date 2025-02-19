import { Routes, Route } from 'react-router'
import './App.css'
import Home from './components/Home'
import About from './components/About'

function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Home />} />
        <Route path='about' element={<About />} />
      </Routes>
    </div>
  )
}

export default App
