import React from 'react'
import { Flex, Box, Button } from '@chakra-ui/react'

const Pagination = ({ startIndex, count, onPageNavigate, maxRecords }) => {
    const totalPages = Math.ceil(count / maxRecords)
    const itemsShow = startIndex + maxRecords;
    return (
        <>
            <Flex justifyContent={'space-between'}
                alignItems={'center'}
                mt={'20px'} >
                <Box>
                    {itemsShow - 1} items of {count}
                </Box>
                <Box>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <Button
                            key={index + 1}
                            onClick={() => onPageNavigate(index + 1)}
                            variant={startIndex === index + 1 ? 'solid' : 'outline'}
                            colorScheme={'teal'}
                            ml={1}
                        >
                            {index + 1}
                        </Button>
                    ))}
                </Box>
            </Flex >

        </>
    )
}

export default Pagination
