import React from 'react'
import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useAuthContext } from '@contexts'
import { LogoutButton } from '../LogoutButton'

export const AuthButton: React.FC = () => {
  const router = useRouter()
  const { isAuthenticated } = useAuthContext()

  if (isAuthenticated) {
    return <LogoutButton />
  }
  return (
    <Button
      onClick={() => router.push('/login')}
      colorScheme="teal"
      variant="solid"
    >
      Login
    </Button>
  )
}
