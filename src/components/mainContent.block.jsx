import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'

const MainContent = ({ title, action, mainContent, bread }) => {
  return (
    <>
      <Text>
        {bread}
      </Text>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        mb={'20px'}
      >
        <Text
          fontSize={'40px'}
        >
          {title}
        </Text>
        <Text>
          {action}
        </Text>
      </Flex>
      <Box>
        {mainContent}
      </Box>
    </>
  )
}

export default MainContent
