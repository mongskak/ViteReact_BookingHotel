import React from 'react'
import { useEffect, useState } from 'react';
import { axiosJWT } from '../services/axiosInterceptor.services';
import { Box, Button } from '@chakra-ui/react'
import MainContent from '../components/mainContent.block'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import Pagination from '../components/pagination.block';
import { useNavigate } from 'react-router-dom';
import { FormatDecimal } from '../functions/formatDecimal';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@chakra-ui/react'

const Room = () => {
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5; // Jumlah item per halaman


  const fetchRooms = async () => {
    const response = await axiosJWT.get(`http://localhost:4000/api/v1/rooms?page=${currentPage}&limit=${itemsPerPage}`);
    if (response.data.success) {
      setRooms(response.data.data);
      setTotalPages(response.data.totalPages); // Set total halaman dari response
      setTotalItems(response.data.totalItems); // Set total items dari response
    }
  };


  useEffect(() => {
    fetchRooms(); // Ambil data saat currentPage berubah
  }, [currentPage]); // Efek ini dijalankan setiap kali currentPage berubah


  const deleteRoomById = async (id) => {
    try {
      await axiosJWT.delete(`/rooms/${id}`);
      console.log('Room deleted successfully');
      // Ambil data baru setelah room dihapus
      fetchRooms();
    } catch (error) {
      console.error('Failed to delete room', error.message);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page); // Mengubah halaman yang sedang ditampilkan
  };

  const navigate = useNavigate();

  const addRoom = () => {
    navigate('/addRoomDetail'); // Mengarahkan ke halaman add room
  };


  return (
    <>
      <MainContent title={'Room'} bread={
        <>
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate('/home')}>Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink isCurrentPage onClick={() => navigate('/room')}>Room</BreadcrumbLink>
            </BreadcrumbItem>

          </Breadcrumb>
        </>

      } action={
        <>
          <Button variant={'solid'} colorScheme='teal' onClick={addRoom}>
            Add Room
          </Button>
        </>
      } mainContent={
        <Box borderWidth='1px' p={5} borderRadius={10}>
          <TableContainer>
            <Table size={'lg'}>
              <Thead>
                <Tr>
                  <Th>Room Number</Th>
                  <Th>Adult Capacity</Th>
                  <Th>Children Capacity</Th>
                  <Th isNumeric>Price</Th>
                </Tr>
              </Thead>
              <Tbody>
                {rooms.map(room => (
                  <Tr key={room._id}>
                    <Td>{room.roomNumber}</Td>
                    <Td>{room.adultCapacity}</Td>
                    <Td>{room.childrenCapacity}</Td>
                    <Td isNumeric>${FormatDecimal(room.price)}</Td>
                    <Td w={'100px'}>
                      {/* Tombol edit dan delete */}
                      <Button colorScheme='teal' variant={'outline'} onClick={() => navigate(`/roomDetail/${room._id}`)}>Edit</Button>
                      <Button colorScheme='red' variant={'solid'} onClick={() => deleteRoomById(room._id)} ml={'5'}>Delete</Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>

            </Table>
          </TableContainer>
          <Pagination currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsDisplayed={rooms.length}
            totalItems={totalItems} />


        </Box>
      } />
    </>
  )
}

export default Room
