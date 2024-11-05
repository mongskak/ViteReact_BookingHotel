import React, { useEffect, useState } from 'react'
import MainContent from '../components/mainContent.block'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, Button, Text, Table, TableContainer, Tbody, Td, Th, Thead, Tr, HStack, Tag, Input, Select } from '@chakra-ui/react'
import Pagination from '../components/pagination.block'
import { axiosJWT } from '../services/axiosInterceptor.services'
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom'
import { BsFile, BsFileEarmark, BsPlus, BsSearch } from 'react-icons/bs'

export const Booking = () => {
    const navigate = useNavigate();
    const [guestLastName, setGuestLastName] = useState('');
    const [status, setStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const itemsPerPage = 5; // Jumlah item per halaman

    const [bookings, setBookings] = useState([])

    const getBookings = async () => {
        try {
            const response = await axiosJWT.get(`/bookings/?page=${currentPage}&limit=${itemsPerPage}&guestLastName=${guestLastName}&status=${status}`)
            setBookings(response.data.data)
            setCount(response.data.count)
        } catch (error) {
            console.log(error);
        }
    }


    const handlePageChange = (page) => {
        setCurrentPage(page); // Mengubah halaman yang sedang ditampilkan
    };

    useEffect(() => {
        getBookings()
    }, [currentPage])


    const onSearch = () => {
        getBookings()
    };

    // const onReset = () => {
    //     setGuestLastName('')
    //     setStatus('')
    //     onSearch()

    // };

    return (
        <>
            <MainContent
                title={'Booking List'}
                action={
                    <>
                        <Button variant={'solid'} colorScheme='teal' onClick={() => navigate('/BookingDetail')}>
                            <BsPlus size={30} /><Text ml={1}>Add Booking</Text>
                        </Button>
                    </>
                }
                bread={
                    <>
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <BreadcrumbLink onClick={() => navigate('/')}>Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <BreadcrumbLink onClick={() => navigate('/Booking')}>Booking</BreadcrumbLink>
                            </BreadcrumbItem>
                        </Breadcrumb>
                    </>
                }
                mainContent={
                    <>

                        <Box mb={5} display={'flex'}>
                            <Box w={'md'}>
                                <Input type='text' placeholder='Search Last Name' value={guestLastName} onChange={(e) => setGuestLastName(e.target.value)} />
                            </Box>
                            <Box ml={5} w={'150px'}>
                                <Select placeholder='Select Status' value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value='Booked'>Booked</option>
                                    <option value='CheckedIn'>Check In</option>
                                    <option value='Canceled'>Canceled</option>
                                    <option value='CheckedOut'>CheckOut</option>
                                </Select>
                            </Box>
                            <Box w={'sm'} ml={5}>
                                <Button variant={'solid'} colorScheme='teal' onClick={onSearch}><BsSearch /><Text ml={1}>Search</Text></Button>
                                {/* <Button variant={'outline'} colorScheme='teal' ml={5} onClick={onReset}>Reset</Button> */}
                            </Box>
                        </Box>
                        <Box borderWidth='1px' p={3} borderRadius={10}>
                            <TableContainer>
                                <Table size={'lg'}>
                                    <Thead>
                                        <Tr>
                                            <Th>Guest Name</Th>
                                            <Th>Room</Th>
                                            <Th>Checkin Date</Th>
                                            <Th>CheckOut Date</Th>
                                            <Th>Status</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {bookings.map(booking => (
                                            <Tr key={booking._id}>
                                                <Td>
                                                    <HStack>
                                                        <Text fontWeight={'bold'}>
                                                            {booking.guestFirstName},
                                                        </Text>
                                                        <Text>{booking.guestLastName}</Text>
                                                    </HStack>
                                                </Td>
                                                <Td>{booking.roomId ? booking.roomId.roomNumber : 'No Room Assigned'}</Td>
                                                <Td>{format(booking.checkInDate, 'dd MMM yyyy')}</Td>
                                                <Td>{format(booking.checkOutDate, 'dd MMM yyyy')}</Td>
                                                <Td>
                                                    <Tag
                                                        variant={'solid'}
                                                        size={'lg'}
                                                        colorScheme={
                                                            booking.status == 'Booked' ? 'blue' :
                                                                booking.status == 'CheckedIn' ? 'green' :
                                                                    booking.status == 'Canceled' ? 'red' :
                                                                        booking.status == 'CheckedOut' ? 'yellow' : 'gray'
                                                        }
                                                    >{booking.status}</Tag></Td>
                                                <Td width={'100px'}>
                                                    <Button variant={'outline'} colorScheme='teal'
                                                        onClick={() => navigate(`/BookingDetail/${booking._id}`)}
                                                    >
                                                        <BsFileEarmark /> <Text ml={1}>View</Text>
                                                    </Button>
                                                </Td>

                                            </Tr>
                                        ))}
                                    </Tbody>

                                </Table>
                            </TableContainer>
                            <Pagination
                                startIndex={currentPage}
                                count={count}
                                maxRecords={itemsPerPage}
                                onPageNavigate={handlePageChange} />


                        </Box>
                    </>
                }

            />

        </>
    )
}
