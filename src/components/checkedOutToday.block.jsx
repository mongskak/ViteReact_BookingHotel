import { Box, Button, Flex, List, ListItem, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { axiosJWT } from '../services/axiosInterceptor.services'
import { format } from 'date-fns'
import Pagination from './pagination.block'
import { EmptyState } from './emptyState.block'

export const CheckedOutToday = ({ onCheckout, AfterOnCheckout }) => {
    const [bookingCheckedOuts, setBookingCheckedOuts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [count, setCount] = useState(0)
    const itemsPerPage = 4
    const BookingStatus = 'CheckedIn'



    const getBookingStatus = async () => {
        try {
            const response = await axiosJWT.get(`/bookings?status=${BookingStatus}&page=${currentPage}&limit=${itemsPerPage}`)
            setBookingCheckedOuts(response.data.data)
            setCount(response.data.count)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getBookingStatus()
    }, [currentPage, AfterOnCheckout])

    const onPageNavigate = (page) => {
        setCurrentPage(page)
    }

    return (
        <>
            <Box borderWidth={1} borderRadius={5} p={5} h={'430px'}>
                <Text fontSize={'25px'} fontWeight={'bold'} mb={5}>
                    Check Out Today
                </Text>
                <List>
                    {bookingCheckedOuts.map(booking => (
                        <ListItem key={booking._id} display={'flex'} alignItems={'center'} justifyContent={'space-between'} borderWidth={1} p={3}>
                            <Box width={'200px'}>
                                <Flex><Text fontWeight={'bold'}>{booking.guestLastName}</Text>, {booking.guestFirstName}</Flex>
                                <Text fontSize={12} color={'grey'}>Leave {format(booking.checkOutDate, 'dd MMM')}</Text>
                            </Box>
                            <Box >
                                {booking.roomId.roomNumber}
                            </Box>
                            <Box >
                                <Button variant={'outline'} colorScheme='teal' onClick={() => onCheckout(booking._id)}>
                                    Check Out
                                </Button>
                            </Box>
                        </ListItem>
                    ))}
                    {bookingCheckedOuts.length == 0 ? <EmptyState /> : <></>}
                </List>
                <Pagination
                    startIndex={currentPage}
                    count={count}
                    maxRecords={itemsPerPage}
                    onPageNavigate={onPageNavigate}
                />

            </Box>
        </>
    )
}
