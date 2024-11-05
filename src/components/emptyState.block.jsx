import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { CiStickyNote } from 'react-icons/ci'

export const EmptyState = () => {
    return (
        <Box display={'flex'} alignItems={'center'} flexDirection={'column'} justifyContent={'center'} w={'100%'}>

            <Image
                boxSize={'250px'}
                objectFit='contain'
                src='https://blogger.googleusercontent.com/img/a/AVvXsEgrp4q5wiy3csVhmu_hgGBE-yFkD95qEuUZVjFU72l4DYw8PLyhq4NkOSuW6z0-Dbm4ow6-BwhjZA3lNwuovWKyY0NoUjQt__xdiP4lOM5KSNtuCEPQ0cDz7oVZlofkCV1T7QxKGDs91F2kjdOk4eUpE6binhaC0PNhbCTTjOcSPQWi1pbSzOHEWF3dxACE'
                alt='Empty Data' />
            <Text color={'gray'}>No data to show</Text>
        </Box>
    )
}
