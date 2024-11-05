import { Box, Button, Flex, List, ListItem, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { axiosJWT } from '../services/axiosInterceptor.services'
import { format } from 'date-fns'
import Pagination from './pagination.block'
import Swal from 'sweetalert2'
import { BsFolder2Open } from 'react-icons/bs'
import { EmptyState } from './emptyState.block'

export const CheckedInToday = () => {
    const [bookingCheckIns, setBookingCheckedIns] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [count, setCount] = useState(0)
    const itemsPerPage = 4
    const BookingStatus = 'Booked'



    const getBookingStatus = async () => {
        try {
            const response = await axiosJWT.get(`/bookings?status=${BookingStatus}&page=${currentPage}&limit=${itemsPerPage}`)
            setBookingCheckedIns(response.data.data)
            setCount(response.data.count)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getBookingStatus()
    }, [currentPage])

    const onUpdate = async (bookingId) => {
        try {

            const response = await axiosJWT.put(`/bookings/${bookingId}`, {
                status: 'CheckedIn'
            });
            getBookingStatus()
            Swal.fire({
                title: "CheckedIn",
                text: "CheckedIn Successfully",
                icon: "success"
            });
        } catch (error) {
            console.log(error);
        }
    };


    const handlePageChange = (page) => {
        setCurrentPage(page)
    };

    return (
        <>
            <Box borderWidth={1} borderRadius={5} p={5} h={'430px'}>
                <Text fontSize={'25px'} fontWeight={'bold'} mb={5}>
                    Check In Today
                </Text>
                <List>
                    {bookingCheckIns.map(booking => (
                        <ListItem key={booking._id} display={'flex'} alignItems={'center'} justifyContent={'space-between'} borderWidth={1} p={3}>
                            <Box width={'200px'}>
                                <Flex><Text fontWeight={'bold'}>{booking.guestLastName}</Text>, {booking.guestFirstName}</Flex>
                                <Text fontSize={12} color={'grey'}>Arrived {format(booking.checkInDate, 'dd MMM')}</Text>
                            </Box>
                            <Box >
                                {booking.roomId.roomNumber}
                            </Box>
                            <Box >
                                <Button variant={'outline'} colorScheme='teal' onClick={() => onUpdate(booking._id)}>
                                    Check In
                                </Button>
                            </Box>
                        </ListItem>
                    ))}
                    {bookingCheckIns.length == 0 ? <EmptyState /> : <></>}

                </List>
                <Pagination
                    startIndex={currentPage}
                    count={count}
                    maxRecords={itemsPerPage}
                    onPageNavigate={handlePageChange}
                />

            </Box>
        </>
    )
}
