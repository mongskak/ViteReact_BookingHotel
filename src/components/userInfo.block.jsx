import { Box, Button, Avatar, Text, Flex, HStack, Wrap, WrapItem } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { axiosJWT } from '../services/axiosInterceptor.services'
import { useNavigate } from 'react-router-dom'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'


const UserInfo = () => {
    const [userLogged, setuserLogged] = useState([]) // Define a state to hold user info

    const navigate = useNavigate();

    useEffect(() => {
        getUserInfo() // Call the function to get user info on page load
    }, [])


    const getUserInfo = async (req, res) => {
        try {
            const userLogged = await axiosJWT.get('/users/profile')
            setuserLogged(userLogged.data.user) // Get user data from server and display it here
        } catch (error) {
            console.log(error) // Handle any errors here

        }
    }

    const doLogout = async (req, res) => {
        try {
            const response = await axiosJWT.delete('/auth/logout')
            console.log('User logged out')
            // Redirect to login page here
            navigate("/login")
        } catch (error) {
            console.log(error) // Handle any errors here
        };
    }

    return (
        <HStack>
            <Text>
                {userLogged.name}
            </Text>
            <Wrap>
                <WrapItem><Avatar name={userLogged.name} size={'sm'} /></WrapItem>
            </Wrap>
            <Box borderRadius='md' p={1} borderWidth={1} cursor={'pointer'} onClick={doLogout}>
                <ArrowForwardIcon />
            </Box>
        </HStack>
    )
}

export default UserInfo
