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
} from '@chakra-ui/react'
import MainContent from '../components/mainContent.block'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosJWT } from '../services/axiosInterceptor.services'
import Swal from 'sweetalert2'

export const AddRoomDetail = () => {
    const navigate = useNavigate();

    const [roomNumber, setRoomNumber] = useState('');
    const [adultCapacity, setAdultCapacity] = useState('');
    const [childrenCapacity, setChildrenCapacity] = useState('');
    const [price, setPrice] = useState('')

    const onBack = () => {
        navigate(-1);
    };

    const onSubmit = async (room, res) => {
        // Add your code here to save the room details to the database
        try {
            const response = await axiosJWT.post('/rooms', {
                roomNumber: roomNumber,
                adultCapacity: adultCapacity,
                childrenCapacity: childrenCapacity,
                price: price,
            });
            if (response.statusText) {
                Swal.fire({
                    title: "Add Room",
                    text: "Create Room Successfully",
                    icon: "success"
                });
                navigate('/room'); // Navigate back to the previous page
            }
        } catch (error) {
            console.error('Failed to save room details', error.message);
            // Add your error handling code here to display error messages to the user
        }
    };



    return (
        <>
            <MainContent title={'Room Detail'}
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
                        <Box p={6} maxW='lg' borderWidth='1px' borderRadius='lg'>
                            <FormControl>
                                <Box mb='5'>
                                    <FormLabel>Room Number</FormLabel>
                                    <Input type='text' onChange={(e) => setRoomNumber(e.target.value)} />
                                </Box>
                                <Box mb='5'>
                                    <FormLabel>Adult Capacity</FormLabel>
                                    <Input type='text' onChange={(e) => setAdultCapacity(e.target.value)} />
                                </Box>
                                <Box mb='5'>
                                    <FormLabel>Children Capacity</FormLabel>
                                    <Input type='text' onChange={(e) => setChildrenCapacity(e.target.value)} />
                                </Box>
                                <Box mb='5'>
                                    <FormLabel>Price</FormLabel>
                                    <Input type='number' onChange={(e) => setPrice(e.target.value)} />
                                </Box>

                            </FormControl>
                            <Button colorScheme='teal' variant='outline' onClick={onBack}>
                                Back
                            </Button>
                            <Button colorScheme='teal' variant='solid' ml={'5'} onClick={onSubmit}>
                                Save
                            </Button>

                        </Box>
                    </>
                } />


        </>
    )
}
