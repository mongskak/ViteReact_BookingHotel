import React from 'react'
import { Flex, Text } from '@chakra-ui/react'

const TitleAction = ({ title, action }) => {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Text
        fontSize={'20px'}
        fontWeight={'bold'}
      >
        {title}
      </Text>
      <Text>
        {action}
      </Text>
    </Flex>
  )
}

export default TitleAction
