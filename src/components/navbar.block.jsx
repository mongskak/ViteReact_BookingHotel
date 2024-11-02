import React from 'react'
import { Flex, Container, HStack, Text, Box, Button } from '@chakra-ui/react'
import AppLogo from './appLogo.block'
import { Link } from 'react-router-dom'
import UserInfo from './userInfo.block'

const Navbar = () => {
  return (

    <Flex
      maxW={'container-xl'}
      mb={"40px"}
      p={5}
      alignItems={"center"}
      justifyContent={"space-between"}

      boxShadow={"base"} rounded={'md'} bg={'white'}

    >
      <HStack>
        <AppLogo />
        <Text>
          <Link to={"/room"}>Room</Link>
        </Text>
      </HStack>
      <HStack><UserInfo /></HStack>
    </Flex>
  )
}

export default Navbar
