import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosJWT } from '../services/axiosInterceptor.services';
import MainContent from '../components/mainContent.block';
import { formattedDate } from '../functions/functions';

export const BookingDetail = () => {
    const { bookingId } = useParams();

    const navigate = useNavigate();
    const [booking, setBooking] = useState({
        "_id": '',
        "guestFirstName": '',
        "guestLastName": '',
        "numberOfAdults": '',
        "numberOfChildren": '',
        "roomNumber": '',
        "status": 'Booked',
        "checkInDate": '',
        "checkOutDate": '',
    })

    const assignBooking = (key, value) => {
        setBooking(prevBookings => ({
            ...prevBookings,
            [key]: value,
        }))

    }

    const getBookingById = async (bookingId) => {
        try {
            const response = await axiosJWT.get(`/bookings/${bookingId}`);
            setBooking(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (bookingId) { // Cek jika bookingId tidak null, tidak kosong, dan tidak undefined
            getBookingById(bookingId);
        }
    }, [bookingId])



    const createBooking = async () => {
        try {
            const response = await axiosJWT.post('/bookings', booking);
            navigate('/Booking')
        } catch (error) {
            console.log(error);
        }
    }

    const updateStatusBooking = async (status) => {
        try {
            await axiosJWT.put(`/bookings/${bookingId}`, {
                status: status
            });
            navigate('/Booking')
        } catch (error) {
            console.log(error);
        }

    }

    const getRoomAvailable = async () => {
        try {
            const response = await axiosJWT.post('/rooms/availableRoom', {
                "NumberOfAdults": booking.numberOfAdults,
                "NumberOfChildren": booking.numberOfChildren,
                "CheckInDate": booking.checkInDate,
                "CheckOutDate": booking.checkOutDate,
            });
            assignBooking('roomNumber', response.data.roomNumber)
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <MainContent
                title={'Booking Detail'}
                bread={
                    <>
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <BreadcrumbLink onClick={() => navigate('/')}>Home</BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbItem>
                                <BreadcrumbLink onClick={() => navigate('/Booking')}>Booking</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <BreadcrumbLink isCurrentPage>Booking Detail</BreadcrumbLink>
                            </BreadcrumbItem>

                        </Breadcrumb>
                    </>
                }
                mainContent={
                    <>
                        <Box p={6} maxW='lg' borderWidth='1px' borderRadius='lg'>
                            <FormControl>
                                <Box mb='3'>
                                    <FormLabel>Guest Last Name</FormLabel>
                                    <Input type='text'
                                        disabled={bookingId ? true : false}
                                        value={booking.guestLastName} onChange={(e) => assignBooking('guestLastName', e.target.value)} />
                                </Box>
                                <Box mb='3'>
                                    <FormLabel>Guest First Name</FormLabel>
                                    <Input type='text'
                                        disabled={bookingId ? true : false}
                                        value={booking.guestFirstName} onChange={(e) => assignBooking('guestFirstName', e.target.value)} />
                                </Box>
                                <Box mb='3'>
                                    <FormLabel>Number Of Adult</FormLabel>
                                    <Input type='number'
                                        disabled={bookingId ? true : false}
                                        value={booking.numberOfAdults} onChange={(e) => assignBooking('numberOfAdults', e.target.value)} />
                                </Box>
                                <Box mb='3'>
                                    <FormLabel>Number Of Children</FormLabel>
                                    <Input type='number'
                                        disabled={bookingId ? true : false}
                                        value={booking.numberOfChildren} onChange={(e) => assignBooking('numberOfChildren', e.target.value)} />
                                </Box>
                                <Box mb='3'>
                                    <FormLabel>Check In Date</FormLabel>
                                    <Input type='date'
                                        disabled={bookingId ? true : false}
                                        value={formattedDate(booking.checkInDate)} onChange={(e) => assignBooking('checkInDate', e.target.value)} />
                                </Box>
                                <Box mb='3'>
                                    <FormLabel>Check Out Date</FormLabel>
                                    <Input type='date'
                                        disabled={bookingId ? true : false}
                                        value={formattedDate(booking.checkOutDate)} onChange={(e) => assignBooking('checkOutDate', e.target.value)} />
                                </Box>
                                <Box mb='3'>
                                    <FormLabel>Room Number</FormLabel>
                                    <Input type='number'
                                        disabled={bookingId ? true : false}
                                        value={booking.roomNumber} onChange={(e) => assignBooking('roomNumber', e.target.value)} />
                                </Box>

                            </FormControl>
                            <Box mt={5}>
                                <Button colorScheme='teal' variant='outline' onClick={() => navigate('/Booking')}>
                                    Back
                                </Button>
                                {!bookingId ? (
                                    <>
                                        <Button colorScheme='teal' variant='outline' ml={'5'} onClick={() => getRoomAvailable()}>
                                            Get Available Room
                                        </Button>
                                        <Button colorScheme='teal' variant='solid' ml={'5'} onClick={() => createBooking()}>
                                            Booked
                                        </Button>
                                    </>
                                ) : booking.status == 'Booked' ? (
                                    <>
                                        <Button colorScheme='teal' variant='outline' ml={'5'} onClick={() => updateStatusBooking('CheckedIn')}>
                                            Check In
                                        </Button>
                                        <Button colorScheme='red' variant='outline' ml={'5'} onClick={() => updateStatusBooking('Canceled')}>
                                            Cancel
                                        </Button>
                                    </>
                                ) : booking.status == 'CheckedIn' ? (
                                    <>
                                        <Button colorScheme='teal' variant='outline' ml={'5'} onClick={() => updateStatusBooking('CheckedOut')}>
                                            Check Out
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                    </>
                                )}
                            </Box>


                        </Box>
                    </>
                } />


        </>
    )
}
