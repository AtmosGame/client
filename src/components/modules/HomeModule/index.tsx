import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useAuthContext } from '@contexts'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useToast } from '@chakra-ui/react'


export const HomeModule: React.FC = () => {
  const { user } = useAuthContext()
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = Cookies.get('token')
        const headers = { Authorization: `Bearer ${token}` }
        const response = await axios.get(
          process.env.NEXT_PUBLIC_APP_API_STORE_URL +
            '/notification/all-notification-by-id',
          { headers }
        )
        const formattedNotifications = response.data.map((notification: { timestamp: string | number | Date }) => ({
          ...notification,
          timestamp: formatTimestamp(notification.timestamp),
        }))
        setNotifications(formattedNotifications)
      } catch (error) {
        console.error(error)
      }
    }

    if (true) {
      fetchNotifications()
    }
  }, [showNotifications])

  const formatTimestamp = (timestamp: string | number | Date) => {
    const ONE_MINUTE = 60
    const ONE_HOUR = 60 * ONE_MINUTE
    const ONE_DAY = 24 * ONE_HOUR
    const ONE_WEEK = 7 * ONE_DAY

    const currentTime = Date.now()
    const timeDiff = Math.floor(
      (currentTime - new Date(timestamp).getTime()) / 1000
    )

    if (timeDiff < ONE_MINUTE) {
      return 'Just now'
    } else if (timeDiff < ONE_HOUR) {
      const minutes = Math.floor(timeDiff / ONE_MINUTE)
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    } else if (timeDiff < ONE_DAY) {
      const hours = Math.floor(timeDiff / ONE_HOUR)
      return `${hours} hour${hours > 1 ? 's' : ''} ago`
    } else if (timeDiff < ONE_WEEK) {
      const days = Math.floor(timeDiff / ONE_DAY)
      return `${days} day${days > 1 ? 's' : ''} ago`
    } else {
      const weeks = Math.floor(timeDiff / ONE_WEEK)
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`
    }
  }

  const [appDetails, setAppDetails] = useState<any[] | null>(null);
  const [loadedImages, setLoadedImages] = useState<any[]>([]);

  useEffect(() => {
    // Fetch data from localhost:8080/all
    fetch(process.env.NEXT_PUBLIC_APP_API_STORE_URL + '/all')
      .then((response) => response.json())
      .then((data) => setAppDetails(data))
      .catch((error) => console.error('Error fetching app details:', error))
  }, [])

  const handleImageLoad = (id: any) => {
    setLoadedImages((prevLoadedImages: any[]) => [...prevLoadedImages, id]);
  };
  
  

  const renderAdminContent = () => {
    if (!appDetails) {
      return (
        <div
          style={{
            background: 'radial-gradient(circle at center, #1e2a3a, #1b2025)',
          }}
          className="min-h-screen flex items-center justify-center text-white"
        >
          <h1 className="text-2xl font-bold">Loading app details...</h1>
        </div>
      )
    }

    return (
      <div
        style={{
          background: 'radial-gradient(circle at center, #1e2a3a, #1b2025)',
        }}
        className="min-h-screen text-white"
      >
        <div className="container mx-auto py-8">
          <h1 className="text-2xl font-bold mb-4 text-center">App Details</h1>
          {appDetails.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {appDetails.map((app) => (
                <Link key={app.id} href={`/detail-developer/${app.id}`}>
                  <div
                    style={{ backgroundColor: '#203040' }}
                    className="rounded-lg shadow-md p-4 flex flex-col items-start justify-between cursor-pointer"
                  >
                    <div className="flex items-center mb-4">
                      {!loadedImages.includes(app.id) && (
                        <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
                      )}
                      <img
                        src={app.imageUrl}
                        alt={app.name}
                        className={`w-16 h-16 rounded-full ${
                          loadedImages.includes(app.id) ? 'block' : 'hidden'
                        }`}
                        onLoad={() => handleImageLoad(app.id)}
                      />
                    </div>
                    <h2 className="text-3xl font-semibold">{app.name}</h2>
                    <p className="text-lg mb-2">{app.description}</p>
                    <p className="mb-2">Version: {app.version}</p>
                    <p className="mb-2">
                      Verification Status:{' '}
                      <span
                        className={`${
                          app.verificationStatus === 'VERIFIED'
                            ? 'text-green-500'
                            : app.verificationStatus === 'UNVERIFIED'
                            ? 'text-blue-500'
                            : 'text-red-500'
                        }`}
                      >
                        {app.verificationStatus}
                      </span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <h2 className="text-2xl font-bold">No app details found.</h2>
            </div>
          )}
        </div>
      </div>
    )
  }
  const handleToggleNotifications = () => {
    setShowNotifications(!showNotifications)
  }

  const renderUserContent = () => {
    // Render the user-specific HTML structure
    return (
      <div
        style={{
          background: 'radial-gradient(circle at center, #1e2a3a, #1b2025)',
        }}
        className="min-h-screen text-white"
      >
        <div className="container mx-auto py-8">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Welcome to the Home Page!
          </h1>
          <div className="flex justify-end">
            <button
              className="bg-transparent text-white rounded-full w-8 h-8 flex items-center justify-center"
              onClick={handleToggleNotifications}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                style={{ fill: '#ffffff' }}
              >
                <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
              </svg>
            </button>
          </div>
          {showNotifications && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  style={{ backgroundColor: '#203040' }}
                  className="rounded-lg shadow-md p-4"
                >
                  <p className="text-lg font-semibold mb-2">
                    {notification.description}
                  </p>
                  <p className="text-gray-500">{notification.timestamp}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
  const renderForbiddenContent = () => {
    // Render the user-specific HTML structure
    return (
      <div
        style={{
          background: 'radial-gradient(circle at center, #1e2a3a, #1b2025)',
        }}
        className="min-h-screen text-white"
      >
        <div className="container mx-auto py-8">
          <h1 className="text-2xl font-bold mb-4 text-center text-red-500">
            Forbidden
          </h1>
        </div>
      </div>
    )
  }

  const emptyContent = () => {
    // Render the user-specific HTML structure
    return (
      <div
        style={{
          background: 'radial-gradient(circle at center, #1e2a3a, #1b2025)',
        }}
        className="min-h-screen text-white"
      >
      </div>
    )
  }
  let content = emptyContent()
  if (user?.role === 'DEVELOPER') {
    content = renderAdminContent()
  } else if (user?.role === 'USER') {
    content = renderUserContent()
  } else {
    content = renderForbiddenContent()
  }

  return <div className={user?.role ? user?.role : undefined}>{content}</div>
}
