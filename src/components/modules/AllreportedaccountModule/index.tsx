import React, { useEffect, useState } from 'react'
import { CardReportedAccount } from './elements'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useAuthContext } from '@contexts'
import Cookies from 'js-cookie'

export const AllreportedaccountModule: React.FC = () => {
  const [listReportedAccount, setListReportedAccount] = useState<string[]>()
  const toast = useToast()
  const router = useRouter()
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
      axios
        .get('/api/report', {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}}`,
          },
        })
        .then(function (response) {
          setListReportedAccount(response.data.listUser)
        })
        .catch(function (error) {
          toast({
            title: 'Terjadi kesalahan! Segera hubungi Contact Person',
            status: 'error',
            position: 'top',
            duration: 4000,
            isClosable: true,
          })

          router.push('/')
        })
    } else {
      // do nothing
    }
  }, [user, isAuthenticated])

  return (
    <>
      {user?.role === 'ADMIN' ? (
        <>
          <div className="flex flex-col items-center pt-5 gap-4">
            <h1 className="font-bold text-2xl md:text-3xl text-white text-center px-2">
              List Akun yang Memiliki Laporan
            </h1>
            <CardReportedAccount listUser={listReportedAccount || []} />
          </div>

          <div className="z-0 w-full">
            <div className="absolute top-0 -left-4 w-[500px] h-[500px] bg-purple-300 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-[500px] h-[500px] bg-emerald-300 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-[500px] h-[500px] bg-pink-300 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  )
}
