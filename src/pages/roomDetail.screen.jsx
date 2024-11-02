import React, { useEffect, useState } from 'react'
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Box,
} from '@chakra-ui/react'
import MainContent from '../components/mainContent.block'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosJWT } from '../services/axiosInterceptor.services'

export const RoomDetail = () => {
    const { roomId } = useParams()
    const navigate = useNavigate();

    const [roomNumber, setRoomNumber] = useState('');
    const [adultCapacity, setAdultCapacity] = useState('');
    const [childrenCapacity, setChildrenCapacity] = useState('');
    const [price, setPrice] = useState('')


    useEffect(() => {
        getRoomById(roomId);
    }, [roomId]); // Fetch room details only when roomId changes



    const getRoomById = async (roomId, req, res) => {
        if (roomId) {
            try {
                const response = await axiosJWT.get(`/rooms/${roomId}`)
                const roomById = response.data.data;
                setRoomNumber(roomById.roomNumber);
                setAdultCapacity(roomById.adultCapacity);
                setChildrenCapacity(roomById.childrenCapacity);
                setPrice(roomById.price);
            } catch (error) {
                console.error('Failed to fetch room details', error.message);

            }

        }
    };

    const onBack = () => {
        navigate(-1);
    };

    const onUpdate = async () => {
        console.log(roomId);
        // Add your code here to save the room details to the database
        try {
            const response = await axiosJWT.put(`/rooms/${roomId}`, {
                roomNumber: roomNumber,
                adultCapacity: adultCapacity,
                childrenCapacity: childrenCapacity,
                price: price,
            });
            if (response.statusText) {
                console.log('Room details saved successfully', response.data);
                navigate('/room'); // Navigate back to the previous page
            }
        } catch (error) {
            console.error('Failed to save room details', error.message);
            // Add your error handling code here to display error messages to the user

        }
    };



    return (
        <>
            <MainContent title={'Room Detail'} mainContent={
                <>
                    <Box p={6} maxW='lg' borderWidth='1px' borderRadius='lg'>
                        <FormControl>
                            <Box mb='5'>
                                <FormLabel>Room Number</FormLabel>
                                <Input type='text' value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} />
                            </Box>
                            <Box mb='5'>
                                <FormLabel>Adult Capacity</FormLabel>
                                <Input type='text' value={adultCapacity} onChange={(e) => setAdultCapacity(e.target.value)} />
                            </Box>
                            <Box mb='5'>
                                <FormLabel>Children Capacity</FormLabel>
                                <Input type='text' value={childrenCapacity} onChange={(e) => setChildrenCapacity(e.target.value)} />
                            </Box>
                            <Box mb='5'>
                                <FormLabel>Price</FormLabel>
                                <Input type='number' value={price} onChange={(e) => setPrice(e.target.value)} />
                            </Box>

                        </FormControl>
                        <Button colorScheme='teal' variant='outline' onClick={onBack}>
                            Back
                        </Button>
                        <Button colorScheme='teal' variant='solid' ml={'5'} onClick={onUpdate}>
                            Update
                        </Button>

                    </Box>
                </>
            } />


        </>
    )
}
