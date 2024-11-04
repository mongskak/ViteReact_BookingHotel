import { Box, Button, Flex, FormLabel, List, ListItem, Select } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { axiosJWT } from '../services/axiosInterceptor.services'

export const RoomAmenity = (currentRoomId) => {
    const roomId = currentRoomId.currentRoomId
    const [Amenity, setAmenity] = useState([])
    const [roomAmenities, setRoomAmenities] = useState([])
    const [selectedAmenityId, setSelectedAmenityId] = useState('')


    const getAmenity = async () => {
        try {
            const response = await axiosJWT.get('/amenities')
            setAmenity(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getAmenityByRoomId = async (roomId) => {
        try {
            const response = await axiosJWT.get(`/roomAmenity/${roomId}`)
            setRoomAmenities(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAmenityByRoomId(roomId)
        getAmenity();
    }, [])



    const createRoomAmenity = async () => {
        try {
            await axiosJWT.post('roomAmenity',
                {
                    "roomId": roomId,
                    "amenityId": selectedAmenityId
                });
            getAmenityByRoomId(roomId)
        } catch (error) {
            console.log(error)
        }
    }

    const onDelete = async (roomAmenityId) => {
        try {
            const res = await axiosJWT.delete(`/roomAmenity/${roomAmenityId}`)
            getAmenityByRoomId(roomId)
        } catch (error) {
            console.log(error)
        }

    };
    return (
        <>
            <FormLabel>Room Amenity</FormLabel>
            <Flex mb='5'>

                <Box w={'90%'}>
                    <Select placeholder='Select Room Amenity' cursor={'pointer'} onChange={(e) => setSelectedAmenityId(e.target.value)}>
                        {Amenity.map(amenity => (
                            <option key={amenity._id} value={amenity._id}>{amenity.amenityName}</option>

                        ))};
                    </Select>
                </Box>
                <Box w={'11%'} ml={3}>
                    <Button variant={'solid'} colorScheme='teal' onClick={createRoomAmenity}>Add</Button>
                </Box>
            </Flex>
            <Box mt={5}>
                <List spacing={0}>
                    {roomAmenities.map(roomAmenity => (
                        <ListItem key={roomAmenity._id} borderWidth={1} p={3}> {/* Pastikan untuk menambahkan key unik */}
                            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                {roomAmenity.amenityId.amenityName}
                                <Button variant={'solid'} colorScheme='red' size={'sm'} onClick={() => onDelete(roomAmenity._id)}>Delete</Button>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Box >
        </>
    )
}
