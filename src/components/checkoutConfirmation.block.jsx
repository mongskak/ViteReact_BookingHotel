import { Box, Heading, HStack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { axiosJWT } from '../services/axiosInterceptor.services';
import moment from 'moment';

export const CheckOutConfirmation = ({ bookingId }) => {
    const [confirmBookings, setconfirmBookings] = useState({});
    const [RoomServices, setRoomServices] = useState({});

    const getBookingById = async (bookingId) => {
        try {
            const response = await axiosJWT.get(`/bookings/${bookingId}`);
            setconfirmBookings(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }
    const dateString = confirmBookings.checkInDate;

    // Membuat objek Date
    const date = new Date(dateString);

    useEffect(() => {
        if (bookingId) {
            getBookingById(bookingId)
        }
    }, [bookingId])

    return (
        <>
            <Box p={5} borderWidth={1} borderRadius={5}>
                <Box>
                    <Heading as='h3' size='md'>
                        Room {confirmBookings.roomNumber} - {confirmBookings.guestLastName}, {confirmBookings.guestFirstName}
                    </Heading>
                    <Box mt={5} fontWeight={'bold'}>
                        <Text>Check-in Date {moment(confirmBookings.checkinDate).format('YYYY-MM-DD')}</Text>
                        <Text>Check-out Date {moment(confirmBookings.checkOutDate).format('YYYY-MM-DD')}</Text>
                        {/* <Text>{moment(confirmBookings.checkOutDate).format('YYYY-MM-DD').diff(moment(confirmBookings.checkInDate).format('YYYY-MM-DD'), 'days')} night</Text> */}
                    </Box>
                </Box>
            </Box>
        </>
    )
}
