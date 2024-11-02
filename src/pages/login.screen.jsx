import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {
    Flex, Card, CardBody, Button, FormControl,
    FormLabel,
    CardHeader,
    Input,
    Box,
} from '@chakra-ui/react'
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();


    const navigate = useNavigate();


    const doLogin = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/v1/auth/login', {
                email: username,
                password: password,
            })
            console.log(response);
            if (response.statusText) {
                navigate("/room")
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
            <Card
                w={'400px'}
            >
                <CardHeader
                    textAlign={'center'}
                    fontSize={'24px'}
                >Login</CardHeader>
                <CardBody>
                    <FormControl>
                        <Box mb={"10px"}>
                            <FormLabel htmlFor='email'>Email address</FormLabel>
                            <Input type='email' id='email' onChange={(e) => setUsername(e.target.value)} />
                        </Box >
                        <Box mb={"10px"}>
                            <FormLabel htmlFor='pass'>Password</FormLabel>
                            <Input type='password' id='pass' onChange={(e) => setPassword(e.target.value)} />
                        </Box>
                        <Button
                            w={'100%'}
                            onClick={doLogin}
                        >Login</Button>

                    </FormControl>
                </CardBody>
            </Card>

        </Flex>
    )
}

export default Login
