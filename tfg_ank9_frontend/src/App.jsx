import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import Services from './pages/Services'
import OurFriends from './pages/OurFriends'
import Register from './pages/Register'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<LogIn />}></Route>
        <Route path='/services' element={<Services />}></Route>
        <Route path='/ourFriends' element={<OurFriends />}></Route>
        <Route path='register' element={<Register />}></Route>
      </Routes>
    </div>
  )
}

export default App