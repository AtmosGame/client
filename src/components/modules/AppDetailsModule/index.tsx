import React, { useEffect, useState } from 'react'
import { App, AppDetailsModuleProps } from './interface'
import { ThumbnailSection } from './sections'
import { DownloadSection } from './sections/DownloadSection'
import { DeveloperSection } from './sections/DeveloperSection'
import { Spinner, useToast } from '@chakra-ui/react'
import axios from 'axios'
import Cookies from 'js-cookie'

export const AppDetailsModule: React.FC<AppDetailsModuleProps> = ({
  appId,
}) => {
  const toast = useToast()
  const [ app, setApp ] = useState<App | null>(null)
  
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
          status="download"
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
