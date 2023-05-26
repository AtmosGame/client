import { useRouter } from 'next/router'
import { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useAuthContext } from '@contexts'
import React from 'react'
import Head from 'next/head'

const DetailPage: React.FC = () => {
  const token = Cookies.get('token')
  const headers = { Authorization: `Bearer ${token}` }
  const { user } = useAuthContext()

  const router = useRouter()
  const { id } = router.query
  const [appDetails, setAppDetails] = useState<any>(null)
  const [loadedImages, setLoadedImages] = useState<string[]>([])
  const [isMutating, setIsMutating] = useState(false)

  const [formValues, setFormValues] = useState({
    appName: '',
    description: '',
    price: '',
  })

  const [installerValues, setInstallerValues] = useState({
    file: '',
    version: '',
  })

  const [showImageForm, setShowImageForm] = useState(false)
  const [imageValues, setImageValues] = useState({
    file: '',
  })

  const [showProfileForm, setShowProfileForm] = useState(false)
  const [showInstallerForm, setShowInstallerForm] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [updateError, setUpdateError] = useState('')

  const fetchAppDetails = async () => {
    try {
      const response = await axios.get(`/api/app/${id}`, { headers })
      setAppDetails(response.data)
    } catch (error) {
      console.error('Error fetching app details:', error)
    }
  }
  if (appDetails == null && user?.role === 'DEVELOPER') {
    fetchAppDetails()
  }

  const handleImageLoad = (id: string) => {
    setLoadedImages((prevLoadedImages) => [...prevLoadedImages, id])
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsMutating(true)
    e.preventDefault()
    try {
      await axios.put(
        process.env.NEXT_PUBLIC_APP_API_STORE_URL + '/' + id,
        formValues,
        { headers }
      )
      setUpdateSuccess(true)

      setUpdateError('')
      fetchAppDetails()
      setIsMutating(false)
    } catch (error) {
      console.error('Error updating app details:', error)
      setUpdateSuccess(false)
      setUpdateError('Failed to update app details.')
      setIsMutating(false)
    }
  }

  const handleInstallerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsMutating(true)

    try {
      const formData = new FormData()
      formData.append('file', installerValues.file)
      formData.append('version', installerValues.version)
      console.log(
        process.env.NEXT_PUBLIC_APP_API_STORE_URL + '/' + id + '/' + 'installer'
      )
      await axios.put(
        process.env.NEXT_PUBLIC_APP_API_STORE_URL +
          '/' +
          id +
          '/' +
          'installer',
        formData,
        { headers }
      )
      setUpdateSuccess(true)
      setUpdateError('')
      fetchAppDetails()
      setIsMutating(false)
    } catch (error) {
      console.error('Error updating installer:', error)
      setUpdateSuccess(false)
      setUpdateError('Failed to update installer.')
      setIsMutating(false)
    }
  }

  const handleImageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsMutating(true)

    try {
      const formData = new FormData()
      formData.append('file', imageValues.file)

      await axios.put(
        `${process.env.NEXT_PUBLIC_APP_API_STORE_URL}/${id}/image`,
        formData,
        { headers }
      )
      setUpdateSuccess(true)
      setUpdateError('')
      fetchAppDetails()
      setIsMutating(false)
    } catch (error) {
      console.error('Error updating image:', error)
      setUpdateSuccess(false)
      setUpdateError('Failed to update image.')
      setIsMutating(false)
    }
  }

  if (!appDetails) {
    return <div>Loading...</div>
  }

  const handleProfileClick = () => {
    setShowProfileForm((prevState) => !prevState)
    if (showInstallerForm) {
      setShowInstallerForm(false)
    }
    if (showImageForm) {
      setShowImageForm(false)
    }
  }

  const handleInstallerClick = () => {
    setShowInstallerForm((prevState) => !prevState)
    if (showProfileForm) {
      setShowProfileForm(false)
    }
    if (showImageForm) {
      setShowImageForm(false)
    }
  }
  const handleImageClick = () => {
    setShowImageForm((prevState) => !prevState)
    if (showProfileForm) {
      setShowProfileForm(false)
    }
    if (showInstallerForm) {
      setShowInstallerForm(false)
    }
  }

  if (user?.role === 'DEVELOPER') {
    return (
      <>
        <div
          style={{
            background: 'radial-gradient(circle at center, #1e2a3a, #1b2025)',
          }}
          className="min-h-screen text-white"
        >
          <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4 text-center">App Details</h1>
            <div className="flex justify-center">
              <div
                className="rounded-lg shadow-md p-8 flex flex-col items-start"
                style={{
                  maxWidth: '400px',
                  backgroundColor: '#203040',
                }}
              >
                <div className="mb-4">
                  {!loadedImages.includes(appDetails.id) && (
                    <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
                  )}
                  <img
                    src={appDetails.imageUrl}
                    alt={appDetails.name}
                    className={`w-32 h-32 rounded-full ${
                      loadedImages.includes(appDetails.id) ? 'block' : 'hidden'
                    }`}
                    onLoad={() => handleImageLoad(appDetails.id)}
                  />
                </div>
                <h2 className="text-3xl font-semibold">{appDetails.name}</h2>
                <p className="text-lg mb-2">{appDetails.description}</p>
                <p className="mb-2">Price: {appDetails.price}</p>
                <p className="mb-2">Version: {appDetails.version}</p>
                <p className="mb-2">
                  <a
                    href={appDetails.installerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Installer
                  </a>
                </p>

                <p className="mb-2">
                  Verification Status:{' '}
                  <span
                    className={`${
                      appDetails.verificationStatus === 'VERIFIED'
                        ? 'text-green-500'
                        : appDetails.verificationStatus === 'UNVERIFIED'
                        ? 'text-blue-500'
                        : 'text-red-500'
                    }`}
                  >
                    {appDetails.verificationStatus}
                  </span>
                </p>
                <div className="mt-4 flex justify-center space-x-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={handleProfileClick}
                  >
                    {showProfileForm ? 'Hide Form' : 'Change Profile'}
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={handleInstallerClick}
                  >
                    {showInstallerForm ? 'Hide Form' : 'Change Installer'}
                  </button>

                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={handleImageClick}
                  >
                    {showImageForm ? 'Hide Form' : 'Change Image'}
                  </button>
                </div>
                {showImageForm && (
                  <form className="mt-4" onSubmit={handleImageSubmit}>
                    {updateSuccess && (
                      <div className="text-green-500 mt-2">
                        Update successful!
                      </div>
                    )}
                    {updateError && (
                      <div className="text-red-500 mt-2">{updateError}</div>
                    )}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-white">
                        Image File
                      </label>
                      <input
                        type="file"
                        name="file"
                        // @ts-ignore
                        onChange={(e) =>
                          // @ts-ignore
                          setImageValues((prevValues) => ({
                            ...prevValues,
                            file: e.target.files && e.target.files[0],
                          }))
                        }
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full text-white"
                        style={{ backgroundColor: '#203040' }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Save Image
                    </button>
                  </form>
                )}
                {showProfileForm && (
                  <form className="mt-4" onSubmit={handleSubmit}>
                    {updateSuccess && (
                      <div className="text-green-500 mt-2">
                        Update successful!
                      </div>
                    )}
                    {updateError && (
                      <div className="text-red-500 mt-2">{updateError}</div>
                    )}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-white">
                        App Name
                      </label>
                      <input
                        type="text"
                        name="appName"
                        value={formValues.appName}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full text-white"
                        style={{ backgroundColor: '#203040' }}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-white">
                        Description
                      </label>
                      <input
                        type="text"
                        name="description"
                        value={formValues.description}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full text-white"
                        style={{ backgroundColor: '#203040' }}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-white">
                        Price
                      </label>
                      <input
                        type="text"
                        name="price"
                        value={formValues.price}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full text-white"
                        style={{ backgroundColor: '#203040' }}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isMutating}
                      className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                        isMutating
                          ? 'bg-indigo-400'
                          : 'bg-indigo-600 hover:bg-indigo-700'
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    >
                      {isMutating ? (
                        <svg
                          className="animate-spin h-5 w-5 mx-auto text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l1-1.647z"
                          ></path>
                        </svg>
                      ) : (
                        'Submit'
                      )}
                    </button>
                  </form>
                )}
                {showInstallerForm && (
                  <form className="mt-4" onSubmit={handleInstallerSubmit}>
                    {updateSuccess && (
                      <div className="text-green-500 mt-2">
                        Update successful!
                      </div>
                    )}
                    {updateError && (
                      <div className="text-red-500 mt-2">{updateError}</div>
                    )}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-white">
                        File Installer
                      </label>
                      <input
                        type="file"
                        name="file"
                        onChange={(e) =>
                          // @ts-ignore

                          setInstallerValues((prevValues) => ({
                            ...prevValues,
                            file: e.target.files && e.target.files[0],
                          }))
                        }
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full text-white"
                        style={{ backgroundColor: '#203040' }}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-white">
                        Version
                      </label>
                      <input
                        type="text"
                        name="version"
                        value={installerValues.version}
                        onChange={(e) =>
                          setInstallerValues((prevValues) => ({
                            ...prevValues,
                            version: e.target.value,
                          }))
                        }
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full text-white"
                        style={{ backgroundColor: '#203040' }}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isMutating}
                      className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                        isMutating
                          ? 'bg-indigo-400'
                          : 'bg-indigo-600 hover:bg-indigo-700'
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    >
                      {isMutating ? (
                        <svg
                          className="animate-spin h-5 w-5 mx-auto text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l1-1.647z"
                          ></path>
                        </svg>
                      ) : (
                        'Submit'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
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
      </>
    )
  }
}

export default DetailPage
