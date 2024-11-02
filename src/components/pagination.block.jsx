import React from 'react'
import { Flex, Box, Button } from '@chakra-ui/react'

const Pagination = ({ currentPage, totalPages, onPageChange, itemsDisplayed }) => {
    return (
        <>
            <Flex justifyContent={'space-between'}
                alignItems={'center'}
                mt={'20px'} >
                <Box>
                    {itemsDisplayed} items
                </Box>
                <Box>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <Button
                            key={index + 1}
                            onClick={() => onPageChange(index + 1)}
                            variant={currentPage === index + 1 ? 'solid' : 'outline'}
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
