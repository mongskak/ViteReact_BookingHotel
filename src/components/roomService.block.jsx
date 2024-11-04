import { Box, Button, Flex, FormControl, FormLabel, Input, Select, Tag, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { axiosJWT } from '../services/axiosInterceptor.services'

export const RoomService = () => {
    const [SelectedGuest, setSelectedGuest] = useState('')
    const [roomNumber, setRoomNumber] = useState('')
    const [roomServices, setRoomServices] = useState([])

    const [selectedBookingId, setSelectedBookingId] = useState('')
    const [amount, setAmount] = useState('')
    const [serviceTypeId, setServiceTypeId] = useState('')



    const getRoomService = async () => {
        try {
            const response = await axiosJWT.get('/roomServiceType')
            setRoomServices(response.data.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getRoomService()
    }, [])

    const onSearch = async () => {
        if (!roomNumber) {
            setSelectedGuest('');
            return
        }
        try {
            const response = await axiosJWT.get(`/rooms?roomNumber=${roomNumber}`)
            if (response.data.data.length === 0) {
                setSelectedGuest('');
                setSelectedBookingId('');

                return
            }
            const resRoomId = response.data.data[0]._id;
            const GuestBooking = await axiosJWT.get(`/bookings?roomId=${resRoomId}`)
            const guestFullName = {
                firstName: GuestBooking.data.data[0].guestFirstName,
                lastName: GuestBooking.data.data[0].guestLastName,
            }
            setSelectedGuest(guestFullName)
            setSelectedBookingId(GuestBooking.data.data[0]._id)
        } catch (error) {
            console.log(error)
        }
    }


    const onRequestRoomService = async () => {
        const currDate = new Date();
        try {
            const response = await axiosJWT.post(`/roomService`, {
                bookingId: selectedBookingId,
                roomServiceTypeId: serviceTypeId,
                date: currDate, // replace with input amount
                amount: amount
            })
            console.log('Room service requested successfully')
            // Reset form here
            setSelectedGuest('');
            setSelectedBookingId('');
            setServiceTypeId('');
            setAmount('12');
            setRoomNumber('12');
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Box borderWidth={1} borderRadius={5} p={5} h={'420px'}>
                <Text fontSize={'25px'} fontWeight={'bold'} mb={5}>
                    Room Service
                </Text>
                <Box>
                    <FormControl>
                        <FormLabel>Room Number</FormLabel>
                        <Flex justifyContent={'space-around'} gep={'5'} mb={1}>
                            <Input type='number' placeholder='Room Number' onChange={(e) => setRoomNumber(e.target.value)} />
                            <Button variant={'outline'} colorScheme='teal' ml={3} onClick={() => onSearch()}>Search</Button>
                        </Flex>
                        <Box p={2}>
                            {SelectedGuest ? (
                                <Tag size={'lg'}>Guest : {SelectedGuest.firstName} {SelectedGuest.lastName}</Tag>
                            ) : (
                                <>
                                </>
                            )}

                        </Box>
                        <Box mb={5}>
                            <FormLabel>Room Service</FormLabel>
                            <Select placeholder='Select room service' onChange={(e) => setServiceTypeId(e.target.value)}>
                                {roomServices.map(roomService => (
                                    <option key={roomService._id} value={roomService._id}>{roomService.name}</option>
                                ))}

                            </Select>
                        </Box>
                        <Box mb={5}>
                            <FormLabel>Amount</FormLabel>
                            <Input type='number' placeholder='Amount' onChange={(e) => setAmount(e.target.value)} />
                        </Box>
                        <Box mt={5}>
                            <Button variant={'solid'} colorScheme='teal' onClick={() => onRequestRoomService()}>Request</Button>
                        </Box>
                    </FormControl>
                </Box>

            </Box>
        </>
    )
}
