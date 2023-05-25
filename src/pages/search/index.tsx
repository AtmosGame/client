import React from 'react'

import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'
import { useAuthContext } from '@contexts'
import { useEffect, useState } from 'react'

const Search = () => {
  const router = useRouter()
  const [keyword, setKeyword] = useState('')
  const toast = useToast()
  const { user, isAuthenticated } = useAuthContext()

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
    } else if (user?.role !== 'USER' && user?.role !== undefined) {
      toast({
        title: 'Anda tidak memiliki akses ke halaman ini!',
        status: 'error',
        position: 'top',
        duration: 4000,
        isClosable: true,
      })
    }
  }, [isAuthenticated, router, toast, user])
  const handleSearch = () => {
    if (keyword.trim() !== '') {
      router.push(`/search/${encodeURIComponent(keyword)}`)
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 pt-40 pb-30">
      {user?.role === 'USER' ? (
        <div>
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Search apps..."
              className="w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button
              className="ml-2 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              onClick={handleSearch}
            >
              Go
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-red-500 text-center text-lg font-medium">
            You do not have access to view search results.
          </p>
        </div>
      )}
    </div>
  )
}

export default Search
