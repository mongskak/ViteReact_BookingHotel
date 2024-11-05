import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {
    Flex, Card, CardBody, Button, FormControl,
    FormLabel,
    CardHeader,
    Input,
    Box,
    Text,
} from '@chakra-ui/react'
import axios from 'axios';
import AppLogo from '../components/appLogo.block';

const Register = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();


    const navigate = useNavigate();


    const doLogin = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/v1/auth/login', {
                email: username,
                password: password,
            })
            if (response.statusText) {
                navigate("/")
            }
        } catch (error) {
            console.log(error);
            alert('Failed to login. Please check your email and password.');

        }
    };

    return (
        <Flex
            alignItems={'center'}
            justifyContent={'center'}
            h={'100vh'}
        >
            <Box borderWidth={1} p={4} borderRadius={10} w={'400px'}>
                <Box mb={2} display={'flex'} justifyContent={'center'}>
                    <AppLogo size='100px' />
                </Box>
                <Text textAlign={'center'} mb={10} fontSize={'24px'} fontWeight={'semibold'}>Booking Hotel</Text>
                <FormControl>
                    <Box mb={"10px"}>
                        <FormLabel htmlFor='email'>Email address</FormLabel>
                        <Input type='email' id='email' placeholder='enter your email' onChange={(e) => setUsername(e.target.value)} />
                    </Box >
                    <Box mb={"10px"}>
                        <FormLabel htmlFor='pass'>Password</FormLabel>
                        <Input type='password' id='pass' placeholder='enter your password' onChange={(e) => setPassword(e.target.value)} />
                    </Box>
                    <Button
                        mt={5}
                        w={'100%'}
                        variant={'solid'}
                        colorScheme='teal'
                        onClick={doLogin}
                    >Login</Button>

                </FormControl>
            </Box>

        </Flex>
    )
}

export default Register
