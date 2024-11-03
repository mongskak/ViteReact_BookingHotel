import { Box, Button, List, ListItem, Text } from '@chakra-ui/react'
import React from 'react'

export const CheckedOutToday = () => {
    return (
        <>
            <Box borderWidth={1} borderRadius={5} p={5}>
                <Text fontSize={'25px'} fontWeight={'bold'} mb={5}>
                    Check Out Today
                </Text>
                <List>
                    <ListItem display={'flex'} alignItems={'center'} justifyContent={'space-around'} borderWidth={1} p={2}>
                        <Box w={'20%'}>
                            John, Doe
                        </Box>
                        <Box w={'20%'}>
                            101
                        </Box>
                        <Box w={'20%'}>
                            2024 Sep 19
                        </Box>
                        <Box w={'20%'}>
                            <Button>
                                Check Out
                            </Button>
                        </Box>
                    </ListItem>
                    <ListItem display={'flex'} alignItems={'center'} justifyContent={'space-around'} borderWidth={1} p={2}>
                        <Box w={'20%'}>
                            John, Doe
                        </Box>
                        <Box w={'20%'}>
                            101
                        </Box>
                        <Box w={'20%'}>
                            2024 Sep 19
                        </Box>
                        <Box w={'20%'}>
                            <Button>
                                Check Out
                            </Button>
                        </Box>
                    </ListItem>
                    <ListItem display={'flex'} alignItems={'center'} justifyContent={'space-around'} borderWidth={1} p={2}>
                        <Box w={'20%'}>
                            John, Doe
                        </Box>
                        <Box w={'20%'}>
                            101
                        </Box>
                        <Box w={'20%'}>
                            2024 Sep 19
                        </Box>
                        <Box w={'20%'}>
                            <Button>
                                Check Out
                            </Button>
                        </Box>
                    </ListItem>
                    <ListItem display={'flex'} alignItems={'center'} justifyContent={'space-around'} borderWidth={1} p={2}>
                        <Box w={'20%'}>
                            John, Doe
                        </Box>
                        <Box w={'20%'}>
                            101
                        </Box>
                        <Box w={'20%'}>
                            2024 Sep 19
                        </Box>
                        <Box w={'20%'}>
                            <Button>
                                Check Out
                            </Button>
                        </Box>
                    </ListItem>
                </List>

            </Box>
        </>
    )
}
