import { Routes, Route, useLocation } from 'react-router-dom'
import { Box, Container } from '@chakra-ui/react'
import Room from './pages/room.screen'
import About from './pages/about.screen'
import PageNotFound from './pages/pageNotFound.screen'
import Navbar from './components/navbar.block'
import Login from './pages/login.screen'
import Home from './pages/home.screen'
import { RoomDetail } from './pages/roomdetail.screen'
import { AddRoomDetail } from './pages/addRoomDetail.screen'
import { Booking } from './pages/booking.screen'
import { BookingDetail } from './pages/bookingDetail.screen'
import './App.css';




function App() {

  const location = useLocation();



  return (
    <div className='App'>
      <Box minH={"100vh"}>
        {location.pathname !== "/login" && <Navbar />}
        <Container maxW="container.xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Room" element={<Room />} />
            <Route path="/RoomDetail/:roomId" element={<RoomDetail />} />
            <Route path="/AddRoomDetail/" element={<AddRoomDetail />} />
            <Route path="/Booking/" element={<Booking />} />
            <Route path="/BookingDetail/" element={<BookingDetail />} />
            <Route path="/BookingDetail/:bookingId" exact element={<BookingDetail />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Container>
      </Box>
    </div>
  )
}

export default App
