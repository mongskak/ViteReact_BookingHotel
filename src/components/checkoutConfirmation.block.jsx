import { Box, Button, Heading, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { axiosJWT } from '../services/axiosInterceptor.services';
import moment from 'moment';
import { FormatDecimal } from '../functions/functions';

export const CheckOutConfirmation = ({ bookingId, onClose }) => {
    const [confirmBookings, setconfirmBookings] = useState({});
    const [RoomServices, setRoomServices] = useState([]);

    const getBookingById = async (bookingId) => {
        try {
            const response = await axiosJWT.get(`/bookings/${bookingId}`);
            setconfirmBookings(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    const getRoomServicesByBookingId = async (bookingId) => {
        try {
            const response = await axiosJWT.get(`/roomService?bookingid=${bookingId}`);
            const roomServiceTypeBookings = response.data.data
            const roomServiceTypes = roomServiceTypeBookings.map(service => ({
                roomServiceType: service.roomServiceTypeId,
                date: service.date,
                amount: service.amount,
            }));
            setRoomServices(roomServiceTypes)

        } catch (error) {
            console.error(error);
        }
    }

    const checkedInDate = moment(confirmBookings.checkInDate).format('DD MMM YYYY')
    const checkedOutDate = moment(confirmBookings.checkOutDate).format('DD MMM YYYY')
    const diffDate = moment(confirmBookings.checkOutDate).diff(confirmBookings.checkInDate, 'days');
    const totalPrice = confirmBookings.roomPrice * diffDate;

    let totalAmount = 0;
    // Menggunakan forEach untuk menjumlahkan amount
    RoomServices.forEach(booking => {
        totalAmount += booking.amount;
    });
    let grandTotalAmount = totalPrice + totalAmount

    useEffect(() => {
        if (bookingId) {
            getBookingById(bookingId)
        }
        getRoomServicesByBookingId(bookingId)
    }, [bookingId])


    const onCheckedOut = async () => {
        try {
            const response = await axiosJWT.put(`/bookings/${bookingId}`, {
                status: 'CheckedOut'
            });
            getBookingById(bookingId)
            onClose()
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <>
            <Box>
                <Heading as='h3' size='md'>
                    Room {confirmBookings.roomNumber} - {confirmBookings.guestLastName}, {confirmBookings.guestFirstName}
                </Heading>
                <Box mt={5}>
                    <Box display={'flex'}>
                        <Text fontWeight={'bold'} w={'150px'}>
                            Check-in Date
                        </Text>
                        {checkedInDate}
                    </Box>
                    <Box display={'flex'}>
                        <Text fontWeight={'bold'} w={'150px'}>
                            Check-out Date
                        </Text>
                        {checkedOutDate} ({diffDate} nights)
                    </Box>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Box display={'flex'} alignItems={'center'}>
                            <Text fontWeight={'bold'} w={'100px'}>Room Total </Text>
                            <Text fontSize={'12'} color={'grey'}>({diffDate} x ${FormatDecimal(confirmBookings.roomPrice)} nights)</Text>
                        </Box>
                        <Box>
                            ${totalPrice}
                        </Box>
                    </Box>
                    <Box>
                        {RoomServices.map(roomService => (
                            <Box key={roomService.roomServiceType._id} display={'flex'} justifyContent={'space-between'}>
                                <Text >{roomService.roomServiceType.name}</Text>
                                <Text> ${FormatDecimal(roomService.amount)}</Text>
                            </Box>
                        ))}

                    </Box>
                </Box>
                <Box textAlign={'right'} mt={'20px'}>
                    <Text fontWeight={'bold'} fontSize={'20'}>
                        Grand Total $  {FormatDecimal(grandTotalAmount)}
                    </Text>
                </Box>
                <Box mt={10}>
                    <Button variant={'solid'} colorScheme='teal' onClick={onCheckedOut}>
                        Confirm Check Out
                    </Button>
                </Box>
            </Box >
        </>
    )
}
