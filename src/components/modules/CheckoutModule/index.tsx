import { useToast } from '@chakra-ui/react'
import { useAuthContext } from '@contexts'
import { CreditCardIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { CheckoutInterface } from './interface'

export const CheckoutModule: React.FC = () => {
  // eslint-disable-next-line no-unused-vars
  const [ isLoading, setIsLoading ] = useState<boolean>(false)
  const [isExpired, setIsExpired] = useState<boolean>(false) // Added state variable
  // eslint-disable-next-line no-unused-vars
  const [listCheckoutDetails, setListCheckoutDetails] =
    useState<CheckoutInterface>()
  const { isAuthenticated } = useAuthContext()
  const toast = useToast()
  const router = useRouter()
  
  const getCheckoutHandler = () => {
    setIsLoading(true)
    axios
      .post('/api/cart/checkout', {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}}`,
        },
      })
      .then((response) => {
        setListCheckoutDetails(response.data)
      })
      .catch((error) => {
        toast({
          title: 'Menunggu Pembayaran dilakukan',
          status: 'info',
          position: 'top',
          duration: 4000,
          isClosable: true,
        })
      })
  }

  useEffect(() => {
    if (isAuthenticated === false) {
      toast({
        title: 'Anda harus login terlebih dahulu!',
        status: 'error',
        position: 'top',
        duration: 4000,
        isClosable: true,
      })
      router.push('/login')
    } else {
      getCheckoutHandler()
    }
  }, [isAuthenticated])

  useEffect(() => {
    const expirationTimer = setTimeout(() => {
      setIsExpired(true)
    }, 3 * 60 * 1000) // 3 minutes in milliseconds

    return () => {
      clearTimeout(expirationTimer)
    }
  }, [])

  return (
    <div className="relative h-screen text-white py-24 lg:py-36 overflow-hidden">
      <div className="relative max-w-[80%] mx-auto space-y-12 z-10">
        <div className="flex gap-4 items-center select-none">
          <h1 className="font-bold text-5xl">
            {isExpired ? 'Expired' : 'Menunggu Pembayaran...'}{' '}
            {/* Display "Expired" if isExpired is true */}
          </h1>
          {!isExpired && (
            <CreditCardIcon className="h-12 w-12 animate-bounce" />
          )}{' '}
          {/* Render the CreditCardIcon only if not expired */}
        </div>
      </div>
      <div className="z-0 w-full">
        <div className="absolute top-0 -left-4 w-[500px] h-[500px] bg-purple-300 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-[500px] h-[500px] bg-emerald-300 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-[500px] h-[500px] bg-pink-300 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  )
}
