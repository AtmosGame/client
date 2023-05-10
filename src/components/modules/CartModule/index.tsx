import { useToast } from '@chakra-ui/react'
import { useAuthContext } from '@contexts'
import { CartCard } from '@elements'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { CartInterface } from './interface'

export const CartModule: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [listCartDetails, setListCartDetails] = useState<CartInterface>()
  const { user, isAuthenticated } = useAuthContext()
  const toast = useToast()
  const router = useRouter()

  const getCartHandler = () => {
    setIsLoading(true)
    axios
      .get('/api/cart', {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}}`,
        },
      })
      .then((response) => {
        setListCartDetails(response.data)
        setIsLoading(false)
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

  const deleteCartHandler = (appId: string) => {
    axios
      .delete(`/api/cart/${appId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}}`,
        },
      })
      .then((response) => {
        getCartHandler()
        toast({
          title: 'Berhasil menghapus aplikasi dari keranjang!',
          status: 'success',
          position: 'top',
          duration: 4000,
          isClosable: true,
        })
      })
      .catch((error) => {
        toast({
          title: 'Gagal menghapus aplikasi dari keranjang!',
          status: 'error',
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
      getCartHandler()
    }
  }, [isAuthenticated])

  return (
    <div className="relative h-screen bg-gray-900 text-white py-24 lg:py-36 overflow-hidden">
      <div className="relative max-w-[80%] mx-auto space-y-12 z-10">
        <div className="flex gap-4 items-center select-none">
          <h1 className="font-bold text-5xl">
            <span className="text-emerald-400">
              {user?.username}
              {"'s "}
            </span>
            Cart
          </h1>
          <ShoppingCartIcon className="h-12 w-12 animate-bounce" />
        </div>
        <div className="lg:grid lg:grid-cols-3 flex flex-col gap-8 max-h-screen">
          <div className="flex flex-col gap-4 lg:col-span-2 overflow-y-scroll pr-2 max-h-[400px]">
            {!isLoading ? (
              listCartDetails?.cartDetailsData.length === 0 ? (
                <p className="text-xl">Your cart is empty.</p>
              ) : (
                listCartDetails?.cartDetailsData.map((app) => (
                  <CartCard
                    key={app.id}
                    id={app.id}
                    addDate={app.addDate}
                    appId={app.appId}
                    appName={app.appName}
                    appPrice={app.appPrice}
                    deleteCartHandler={deleteCartHandler}
                  />
                ))
              )
            ) : (
              <div className="w-full justify-center items-center flex">
                <div className="border-inherit h-24 w-24 animate-spin rounded-full border-b-2"></div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-3xl">Apps Summary</p>
            <div className="flex justify-between items-center">
              <p className="text-md">Total Price</p>
              <p className="text-md">
                IDR{' '}
                {listCartDetails?.cartDetailsData
                  .reduce((total, app) => {
                    return total + app.appPrice
                  }, 0)
                  .toLocaleString() ?? 0}
              </p>
            </div>
            <button
              className="px-4 py-2 font-bold rounded-md bg-emerald-400 text-gray-900 active:bg-emerald-600 transition-all hover:shadow-lg hover:shadow-emerald-400/25"
              onClick={() => {
                // TODO: Link to checkout page @Dimitri
              }}
            >
              Checkout
            </button>
          </div>
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
