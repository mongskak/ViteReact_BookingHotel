import { Box, Button, Flex, List, ListItem, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { axiosJWT } from '../services/axiosInterceptor.services'
import { format } from 'date-fns'

export const CheckedOutToday = ({ onCheckout }) => {
    const [bookingCheckedOuts, setBookingCheckedOuts] = useState([])
    const BookingStatus = 'CheckedIn'



    const getBookingStatus = async () => {
        try {
            const response = await axiosJWT.get(`/bookings?status=${BookingStatus}`)
            setBookingCheckedOuts(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getBookingStatus()
    }, [])

    return (
        <>
            <Box borderWidth={1} borderRadius={5} p={5} h={'400px'}>
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

                </List>

            </Box>
        </>
    )
}
