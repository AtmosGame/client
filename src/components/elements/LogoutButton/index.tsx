import React from 'react'
import { Button, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { useAuthContext } from '@contexts'

export const LogoutButton: React.FC = () => {
  const toast = useToast()
  const router = useRouter()
  const { user } = useAuthContext()

  const logoutHandler = () => {
    const data = {
      username: user?.username,
    }
    axios
      .post('/api/auth/logout', data)
      .then((response) => {
        Cookies.remove('token')
        toast({
          title: 'Berhasil logout!',
          status: 'success',
          position: 'top',
          duration: 4000,
          isClosable: true,
        })
        router.push('/')
      })
      .catch((error) => {
        toast({
          title: 'Terjadi kesalahan! Segera hubungi Contact Person',
          status: 'error',
          position: 'top',
          duration: 4000,
          isClosable: true,
        })
      })
  }

  return (
    <div>
      <Button onClick={logoutHandler} colorScheme="red" variant="solid">
        Logout
      </Button>
    </div>
  )
}
