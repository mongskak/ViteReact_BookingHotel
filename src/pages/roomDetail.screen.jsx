import React, { useEffect, useState } from 'react'
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Flex,
} from '@chakra-ui/react'
import MainContent from '../components/mainContent.block'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosJWT } from '../services/axiosInterceptor.services'
import { RoomAmenity } from '../components/roomAmenity.block'

export const RoomDetail = () => {
    const { roomId } = useParams()
    const navigate = useNavigate();

    const [room, setRoom] = useState({
        "_id": '',
        "roomNumber": '',
        "adultCapacity": '',
        "childrenCapacity": '',
        "price": ''
    })

    const assignRoom = (key, value) => {
        setRoom(prevDetails => ({
            ...prevDetails,
            [key]: value
        }));
    };

    useEffect(() => {
        getRoomById(roomId);
    }, [roomId]); // Fetch room details only when roomId changes



    const getRoomById = async (roomId) => {
        if (roomId) {
            try {
                const response = await axiosJWT.get(`/rooms/${roomId}`)
                const roomById = response.data.data;
                setRoom(roomById)
            } catch (error) {
                console.error('Failed to fetch room details', error.message);

            }

        }
    };


    const onUpdate = async () => {
        // Add your code here to save the room details to the database
        try {
            const response = await axiosJWT.put(`/rooms/${room._id}`, {
                roomNumber: room.roomNumber,
                adultCapacity: room.adultCapacity,
                childrenCapacity: room.childrenCapacity,
                price: room.price,
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
            <MainContent
                title={'Room Detail'}

                bread={
                    <>
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <BreadcrumbLink onClick={() => navigate('/')}>Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <BreadcrumbLink onClick={() => navigate('/Room')}>Room</BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbItem>
                                <BreadcrumbLink isCurrentPage>Room Detail</BreadcrumbLink>
                            </BreadcrumbItem>

                        </Breadcrumb>
                    </>
                }
                mainContent={
                    <>
                        <Flex>
                            <Box w={'50%'} p={6} borderWidth='1px' borderRadius='lg'>
                                <FormControl>
                                    <Box mb='5'>
                                        <FormLabel>Room Number</FormLabel>
                                        <Input type='text' value={room.roomNumber} onChange={(e) => assignRoom('roomNumber', e.target.value)} />
                                    </Box>
                                    <Box mb='5'>
                                        <FormLabel>Adult Capacity</FormLabel>
                                        <Input type='text' value={room.adultCapacity} onChange={(e) => assignRoom('adultCapacity', e.target.value)} />
                                    </Box>
                                    <Box mb='5'>
                                        <FormLabel>Children Capacity</FormLabel>
                                        <Input type='text' value={room.childrenCapacity} onChange={(e) => assignRoom('childrenCapacity', e.target.value)} />
                                    </Box>
                                    <Box mb='5'>
                                        <FormLabel>Price</FormLabel>
                                        <Input type='number' value={room.price} onChange={(e) => assignRoom('price', e.target.value)} />
                                    </Box>

                                </FormControl>
                                <Button colorScheme='teal' variant='outline' onClick={() => navigate('/Room')}>
                                    Back
                                </Button>
                                <Button colorScheme='teal' variant='solid' ml={'5'} onClick={onUpdate}>
                                    Update
                                </Button>

                            </Box>
                            <Box w={'50%'} ml={7} p={6} h={'100%'} borderWidth='1px' borderRadius='lg'>
                                <FormControl>
                                    <RoomAmenity currentRoomId={roomId} />
                                </FormControl>
                            </Box>
                        </Flex>
                    </>
                } />


        </>
    )
}
