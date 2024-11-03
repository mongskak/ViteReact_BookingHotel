


import { Box, Flex, Image, LinkBox, useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CheckedInToday } from '../components/checkedInToday.block'
import { CheckedOutToday } from '../components/checkedOutToday.block'
import { RoomService } from '../components/roomService.block'
import { OccupancyRate } from '../components/occupancyRate.block'
import { PopUp } from '../components/popup.block'
import { CheckOutConfirmation } from '../components/checkoutConfirmation.block'

const Home = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedBookingId, setSelectedBookingId] = useState('')

    const onHandlerCheckout = (bookingId) => {
        setSelectedBookingId(bookingId)
        onOpen()
    }


    return (
        <>
            <PopUp isOpen={isOpen} onOpen={onOpen} onClose={onClose}
                content={
                    <>
                        <CheckOutConfirmation bookingId={selectedBookingId} />
                    </>
                } />
            <Box mb={50}>
                <Image
                    w={'100%'}
                    src='https://blogger.googleusercontent.com/img/a/AVvXsEiYnLU7MeYY1ECUAFYNgqnPPQM-IzRVyuxlavX5w3eWkLuMXC2NTalg0T9fKSx0PeRSFHh54jk2speTAdcwBqJFSfFj6KszbMDxC_aWPATp24Y0Jj6VZ5Q0RHWsawxcbMZ22smwSX5Ll5Om0njgfuHYGUdqIZS1s_tLov5cE7zatuKSTPtqIxy8JZjPGR-r'
                >
                </Image>
                <Flex justifyContent={'space-around'} gap={'10px'} mt={3}>
                    <Box w={'100%'}>
                        <CheckedOutToday onCheckout={onHandlerCheckout} />
                    </Box>
                    <Box w={'100%'}>
                        <CheckedInToday />
                    </Box>
                </Flex>
                <Flex justifyContent={'space-around'} gap={'10px'} mt={3}>
                    <Box w={'100%'}>
                        <OccupancyRate />
                    </Box>
                    <Box w={'100%'}>
                        <RoomService />
                    </Box>
                </Flex>
            </Box>

        </>
    )
}

export default Home
