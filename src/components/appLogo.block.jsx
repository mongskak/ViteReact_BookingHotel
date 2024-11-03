import React from 'react'
import { Image, Text } from '@chakra-ui/react'

const AppLogo = ({ size = '30px' }) => {
  return (
    <>
      <Image
        boxSize={size}
        borderRadius='5px'
        objectFit='cover'
        src='https://blogger.googleusercontent.com/img/a/AVvXsEhAU7uJohiaO_LdVFVIt1RscPnmIQLXbESXjV0z5J670AbKL_hkJcRK0064gZkrilzatYV9DYcAuj_cbFaluHg02zdGoMbG9vkOhY73GHGpCUAKdcIjG3ZJfVqi1oR91rKd2nx9G5NobleFTWOT4-ID0qY5_NQQ78nYrikpLx7LiwauEK0-yR5K-3zTm_b6'
        alt='Logo'
      />
    </>
  )
}

export default AppLogo
