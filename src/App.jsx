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


function App() {
  const location = useLocation();


  return (
    <Box minH={"100vh"}>
      {location.pathname !== "/login" && <Navbar />}
      <Container maxW="container.xl">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/room" element={<Room />} />
          <Route path="/roomDetail/:roomId" element={<RoomDetail />} />
          <Route path="/addRoomDetail/" element={<AddRoomDetail />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Container>
    </Box>
  )
}

export default App
