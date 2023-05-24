import React, { useEffect, useState } from 'react'
import { App, AppDetailsModuleProps } from './interface'
import { ThumbnailSection } from './sections'
import { DownloadSection } from './sections/DownloadSection'
import { DeveloperSection } from './sections/DeveloperSection'
import { Spinner, useToast } from '@chakra-ui/react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useAuthContext } from '@contexts'

export const AppDetailsModule: React.FC<AppDetailsModuleProps> = ({
  appId,
}) => {
  const toast = useToast()
  const [ app, setApp ] = useState<App | null>(null)
  const [ isPurchased, setIsPurchased ] = useState(false)
  const [ downloadUrl, setDownloadUrl ] = useState('')
  const [ isAppInCart, setIsAppInCart ] = useState(false)
  
  const { isAuthenticated } = useAuthContext()
  
  const followApp = () => {
    
  }
  
  const unfollowApp = () => {
    
  }
  
  const downloadApp = () => {
    
  }
  
  const addAppToCart = () => {
    
  }
  
  const removeAppFromCart = () => {
    
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
    if (!appId) return
    axios
      .get(`/api/apps/details/${appId}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
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
    if (!isAuthenticated) return
    axios
      .get(`/api/apps/details/${appId}/download`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          },
        })
      .then((response) => {
        const newIsPurchased = !response.data.installerUrl.includes('http')
        setIsPurchased(newIsPurchased)
        setDownloadUrl(response.data.installerUrl)
      })
      .catch(() => {
        toast({
          title: 'Terjadi kesalahan ketika mendapatkan data kepemilikan aplikasi',
          status: 'error',
          position: 'top',
          duration: 4000,
          isClosable: true,
        })
      })
    axios
      .get(`/api/apps/details/${appId}/in-cart`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          },
        })
      .then((response) => {
        setIsAppInCart(response.data.isInCart)
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
  }, [appId])

  if (!app) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='teal'
          size='xl'
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
          isFollowing={true}
          onFollow={followApp}
          onUnfollow={unfollowApp}
        />
        <DownloadSection
          title={app.name}
          price={app.price}
          status={getAppStatus(isPurchased, isAppInCart)}
          version={app.version}
          onDownload={downloadApp}
          onCartAdd={addAppToCart}
          onCartRemove={removeAppFromCart}
        />
        <DeveloperSection
          username="monolith_soft"
          profilePictureUrl='https://support.musicgateway.com/wp-content/uploads/2021/07/monolith-soft-2.png'
        />
      </>
    )
  }
}
