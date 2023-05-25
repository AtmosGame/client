import React from 'react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useAuthContext } from '@contexts'
import Cookies from 'js-cookie'
import axios from 'axios'

interface App {
  id: number
  name: string
  userId: number | null
  imageUrl: string
  description: string
  installerUrl: string
  version: string
  price: number
  verificationStatus: string
  verificationAdminId: number | null
  verificationDate: string | null
}

export const AppDetailAdminModule: React.FC = () => {
  const { user, isAuthenticated } = useAuthContext()
  const router = useRouter()
  const { id } = router.query
  const [app, setApp] = useState<App | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    if (isAuthenticated) {
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (isAuthenticated !== null) {
      if (isAuthenticated === false) {
        toast({
          title: 'Anda harus login terlebih dahulu!',
          status: 'error',
          position: 'top',
          duration: 4000,
          isClosable: true,
        })
        router.push('/login')
      } else if (user?.role !== 'ADMIN' && user?.role !== undefined) {
        toast({
          title: 'Anda tidak memiliki akses ke halaman ini!',
          status: 'error',
          position: 'top',
          duration: 4000,
          isClosable: true,
        })
        router.push('/')
      } else if (user?.role === 'ADMIN') {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_APP_API_STORE_URL}/verification/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${Cookies.get('token')}`,
                },
              }
            )
            const data = response.data
            setApp(data)
            setIsLoading(false)
          } catch (error) {
            console.error('Error fetching app details:', error)
            setIsLoading(false)
          }
        }

        if (id) {
          fetchData()
        }
      }

      setIsLoading(false)
    }
  }, [id, isAuthenticated, router, toast, user])

  if (!user || user.role !== 'ADMIN') {
    return <p className="text-center mt-4">Access denied.</p>
  }

  if (isLoading) {
    return <p className="text-center mt-4">Loading...</p>
  }

  if (!app) {
    return <p className="text-center mt-4">App not found.</p>
  }
  console.log(user.role)

  return (
    <div className="relative h-screen py-12 lg:py-12 overflow-hidden bg-gray-800 text-white">
      <div className="mx-auto max-w-[50%] z-50">
        <h1 className="text-4xl text-center font-bold pb-6">App Detail</h1>
        <div className="backdrop-blur-md bg-white/5 border-[1px] border-white rounded-xl p-8">
          <div>
            <h1 className="text-2xl font-bold mb-4">{app.name}</h1>
            <img
              src={app.imageUrl}
              alt={app.name}
              className="w-48 h-48 object-contain mb-4"
            />

            <p className="mb-2">Description: {app.description}</p>
            <p className="mb-2">Version: {app.version}</p>
            <p className="mb-2">Price: {app.price}</p>

            {/* Render verification status */}
            <p className="mb-2">
              Verification Status: {app.verificationStatus || 'Not Verified'}
            </p>

            {/* Render verify button */}
            {app.verificationStatus === 'UNVERIFIED' && (
              <div className="mb-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={async () => {
                    try {
                      console.log('a')
                      console.log(user.role)
                      await axios.post(
                        `${process.env.NEXT_PUBLIC_APP_API_STORE_URL}/${id}/verify`,
                        {},
                        {
                          headers: {
                            Authorization: `Bearer ${Cookies.get('token')}`,
                          },
                        }
                      )
                      // Handle verification logic
                      toast({
                        title: 'App verified',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                      })
                    } catch (error) {
                      // Handle error
                      console.error('Error verifying app:', error)
                    }
                  }}
                >
                  Verify
                </button>

                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={async () => {
                    try {
                      await axios.post(
                        `http://34.87.155.107/verification/${id}/reject`,
                        {},
                        {
                          headers: {
                            Authorization: `Bearer ${Cookies.get('token')}`,
                          },
                        }
                      )
                      // Handle rejection logic
                      toast({
                        title: 'App rejected',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                      })
                    } catch (error) {
                      // Handle error
                      console.error('Error rejecting app:', error)
                    }
                  }}
                >
                  Reject
                </button>
              </div>
            )}

            {/* Render installer download button */}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
              onClick={() => {
                console.log(app.installerUrl)
                window.open(app.installerUrl, '_blank')
              }}
            >
              Download Installer
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
