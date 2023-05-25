import React, { useEffect, useState } from 'react'
import { App, AppDetailsModuleProps } from './interface'
import { ThumbnailSection } from './sections'
import { DownloadSection } from './sections/DownloadSection'
import { Spinner, useToast } from '@chakra-ui/react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useAuthContext } from '@contexts'

export const AppDetailsModule: React.FC<AppDetailsModuleProps> = ({
  appId,
}) => {
  const toast = useToast()
  const [app, setApp] = useState<App | null>(null)
  const [isPurchased, setIsPurchased] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState('')
  const [isAppInCart, setIsAppInCart] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const { isAuthenticated } = useAuthContext()

  const followApp = () => {
    axios
      .post(
        `/api/apps/details/${appId}/subscribe`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      )
      .then(() => {
        setIsSubscribed(true)
      })
      .catch(() => {
        toast({
          title: 'Terjadi kesalahan ketika melakukan subscribe',
          status: 'error',
          position: 'top',
          duration: 4000,
          isClosable: true,
        })
      })
  }

  const unfollowApp = () => {
    axios
      .post(
        `/api/apps/details/${appId}/unsubscribe`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      )
      .then(() => {
        setIsSubscribed(false)
      })
      .catch(() => {
        toast({
          title: 'Terjadi kesalahan ketika melakukan unsubscribe',
          status: 'error',
          position: 'top',
          duration: 4000,
          isClosable: true,
        })
      })
  }

  const addAppToCart = () => {
    axios
      .post(
        `/api/apps/details/${appId}/add-to-cart`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      )
      .then(() => {
        setIsAppInCart(true)
      })
      .catch(() => {
        toast({
          title: 'Terjadi kesalahan ketika menambahkan aplikasi ke keranjang',
          status: 'error',
          position: 'top',
          duration: 4000,
          isClosable: true,
        })
      })
  }

  const removeAppFromCart = () => {
    axios
      .delete(`/api/apps/details/${appId}/remove-from-cart`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      })
      .then(() => {
        setIsAppInCart(false)
      })
      .catch(() => {
        toast({
          title: 'Terjadi kesalahan ketika menghapus aplikasi dari keranjang',
          status: 'error',
          position: 'top',
          duration: 4000,
          isClosable: true,
        })
      })
  }

  const getAppStatus = (purchased: boolean, inCart: boolean) => {
    if (!isAuthenticated) {
      return 'login'
    }
    if (purchased) {
      return 'download'
    }
    if (inCart) {
      return 'remove-from-cart'
    }
    return 'add-to-cart'
  }

  useEffect(() => {
    axios
      .get(`/api/apps/details/${appId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      })
      .then((response) => {
        setApp(response.data)
      })
      .catch(() => {
        toast({
          title: 'Terjadi kesalahan ketika mendapatkan data aplikasi',
          status: 'error',
          position: 'top',
          duration: 4000,
          isClosable: true,
        })
      })
    if (!Cookies.get('token')) return
    axios
      .get(`/api/apps/details/${appId}/download`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      })
      .then((response) => {
        const newIsPurchased = response.data.installerUrl.includes('http')
        setIsPurchased(newIsPurchased)
        setDownloadUrl(response.data.installerUrl)
      })
      .catch(() => {
        toast({
          title:
            'Terjadi kesalahan ketika mendapatkan data kepemilikan aplikasi',
          status: 'error',
          position: 'top',
          duration: 4000,
          isClosable: true,
        })
      })
    axios
      .get(`/api/apps/details/${appId}/in-cart`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      })
      .then((response) => {
        setIsAppInCart(response.data.appInCart)
      })
      .catch(() => {
        toast({
          title: 'Terjadi kesalahan ketika mendapatkan data keranjang',
          status: 'error',
          position: 'top',
          duration: 4000,
          isClosable: true,
        })
      })
    axios
      .get(`/api/apps/details/${appId}/is-subscribed`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      })
      .then((response) => {
        console.log(`Result: ${response.data.isSubscribed}`)
        setIsSubscribed(response.data.isSubscribed)
      })
      .catch(() => {
        toast({
          title: 'Terjadi kesalahan ketika mendapatkan status subscribe',
          status: 'error',
          position: 'top',
          duration: 4000,
          isClosable: true,
        })
      })
  }, [])

  if (!app) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal"
          size="xl"
        />
      </div>
    )
  } else {
    return (
      <>
        <ThumbnailSection
          title={app.name}
          description={app.description}
          imageUrl={app.imageUrl}
          isFollowing={isSubscribed}
          onFollow={followApp}
          onUnfollow={unfollowApp}
        />
        <DownloadSection
          title={app.name}
          price={app.price}
          status={getAppStatus(isPurchased, isAppInCart)}
          version={app.version}
          downloadUrl={downloadUrl}
          onCartAdd={addAppToCart}
          onCartRemove={removeAppFromCart}
        />
      </>
    )
  }
}
