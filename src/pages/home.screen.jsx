


import { Box, Flex, Image, LinkBox } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect } from 'react'
import { CheckedInToday } from '../components/checkedInToday.block'
import { CheckedOutToday } from '../components/checkedOutToday.block'

const Home = () => {
    return (
        <>
            <Box>
                <Image
                    w={'100%'}
                    src='https://blogger.googleusercontent.com/img/a/AVvXsEiYnLU7MeYY1ECUAFYNgqnPPQM-IzRVyuxlavX5w3eWkLuMXC2NTalg0T9fKSx0PeRSFHh54jk2speTAdcwBqJFSfFj6KszbMDxC_aWPATp24Y0Jj6VZ5Q0RHWsawxcbMZ22smwSX5Ll5Om0njgfuHYGUdqIZS1s_tLov5cE7zatuKSTPtqIxy8JZjPGR-r'
                >
                </Image>
                <Flex justifyContent={'space-around'} gap={'10px'} mt={3}>
                    <Box w={'100%'}>
                        <CheckedOutToday />
                    </Box>
                    <Box w={'100%'}>
                        <CheckedInToday />
                    </Box>
                </Flex>
            </Box>

        </>
    )
}

export default Home
