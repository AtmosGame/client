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
    console.log(data)
    axios
      .post('/api/auth/logout', data, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}}`,
        },
      })
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
          title: 'Anda belum login, silahkan login terlebih dahulu!',
          status: 'error',
          position: 'top',
          duration: 4000,
          isClosable: true,
        })
      })
  }

  return (
    <Button onClick={logoutHandler} colorScheme="red" variant="solid">
      Logout
    </Button>
  )
}
