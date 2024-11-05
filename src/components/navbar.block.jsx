import React from 'react'
import { Flex, Container, HStack, Text, Box, Button } from '@chakra-ui/react'
import AppLogo from './appLogo.block'
import { Link } from 'react-router-dom'
import UserInfo from './userInfo.block'
import AppTitle from './appTitle.block'

const Navbar = () => {
  return (

    <Flex
      mb={"30px"}
      p={3}
      alignItems={"center"}
      justifyContent={"space-between"}

      boxShadow={"base"} rounded={'md'} bg={'white'}

    >
      <HStack>
        <AppLogo />
        <AppTitle />
        <Text>
          <Link to={"/"}>Home</Link>
        </Text>
        <Text ml={5}>
          <Link to={"/Room"}>Room</Link>
        </Text>
        <Text ml={5}>
          <Link to={"/Booking"}>Booking</Link>
        </Text>
      </HStack>
      <HStack><UserInfo /></HStack>
    </Flex >
  )
}

export default Navbar
