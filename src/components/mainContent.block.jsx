import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'

const MainContent = ({ title, action, mainContent, bread }) => {
  return (
    <>
      <Box>
        {bread}
      </Box>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        mb={'10px'}
      >
        <Text
          fontSize={'40px'}
        >
          {title}
        </Text>
        <Box>
          {action}
        </Box>
      </Flex>
      <Box>
        {mainContent}
      </Box>
    </>
  )
}

export default MainContent
