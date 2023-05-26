import React from 'react'
import { useRouter } from 'next/router'
import { useState, useRef } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useAuthContext } from '@contexts'

export const SubmitModule: React.FC = () => {
  const [appName, setAppName] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [description, setDescription] = useState('')
  const [installerFile, setInstallerFile] = useState<File | null>(null)
  const [version, setVersion] = useState('0.0.1')
  const [price, setPrice] = useState(0)
  const [isMutating, setIsMutating] = useState(false)
  const imageFileInputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState('')
  const token = Cookies.get('token')
  const headers = { Authorization: `Bearer ${token}` }
  const { user } = useAuthContext()

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsMutating(true)

    const formData = new FormData()
    formData.append('appName', appName)
    // @ts-ignore
    formData.append('imageFile', imageFile)
    formData.append('description', description)
    // @ts-ignore
    formData.append('installerFile', installerFile)
    formData.append('version', version)
    formData.append('price', price.toString())
    try {
      await axios.post(
        '/api/store/v1/submit',
        formData,
        { headers }
      )
      setIsMutating(false)
      await router.push('/home')
    } catch (error: unknown) {
      setIsMutating(false)
      if (axios.isAxiosError(error)) {
        console.error('Error data:', error.response?.data)
        // if (
        //   error.response?.data.message.indexOf(
        //     "Validation failed for object='appDataRequest'."
        //   ) != -1
        // ) {
        //   setError('Image File atau Installer File tidak boleh kosong')
        // } else {
        //   setError(error.response?.data.message)
        // }
      } else {
        console.error(
          'An error occurred while submitting the form:',
          error as Error
        )
        setError('Terjadi masalah saat submit file')
      }
    }
  }

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  if (user?.role === 'DEVELOPER') {
    return (
      <>
        
        <div
          className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
          style={{
            background: 'radial-gradient(circle at center, #1e2a3a, #1b2025)',
          }}
        >
          <div className="max-w-md w-full bg-white p-6 rounded-md shadow-md">
            <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">
              Upload Form
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="appName"
                  className="block text-sm font-medium text-gray-700"
                >
                  App Name
                </label>
                <input
                  type="text"
                  id="appName"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="imageFile"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image File
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {imageFile ? (
                      <>
                        <p className="text-sm text-gray-600">
                          {imageFile.name}
                        </p>
                        <button
                          type="button"
                          className="text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={() => setImageFile(null)}
                        >
                          Remove
                        </button>
                      </>
                    ) : (
                      <>
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 10l7-7 7 7m-7 21v-9m8-2h-5v5m10-5h-5v5m6 10a11 11 0 11-22 0 11 11 0 0122 0z"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="image-file-input"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="image-file-input"
                              type="file"
                              className="sr-only"
                              ref={imageFileInputRef}
                              // @ts-ignore
                              onChange={(e) =>
                                setImageFile(e.target.files?.[0] || null)
                              }
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="installerFile"
                  className="block text-sm font-medium text-gray-700"
                >
                  Installer File
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {installerFile ? (
                      <>
                        <p className="text-sm text-gray-600">
                          {installerFile.name}
                        </p>
                        <button
                          type="button"
                          className="text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={() => setInstallerFile(null)}
                        >
                          Remove
                        </button>
                      </>
                    ) : (
                      <>
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 10l7-7 7 7m-7 21v-9m8-2h-5v5m10-5h-5v5m6 10a11 11 0 11-22 0 11 11 0 0122 0z"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="installer-file-input"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="installer-file-input"
                              type="file"
                              className="sr-only"
                              // @ts-ignore
                              onChange={(e) =>
                                setInstallerFile(e.target.files?.[0] || null)
                              }
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          ZIP, EXE, DMG up to 100MB
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="version"
                  className="block text-sm font-medium text-gray-700"
                >
                  Version
                </label>
                <input
                  type="text"
                  id="version"
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value))}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              {error && (
                <div className="text-red-500 font-medium mt-2 text-center text-sm py-3">
                  {error}
                </div>
              )}

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
