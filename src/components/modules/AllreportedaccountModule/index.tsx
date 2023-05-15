import React, { useEffect, useState } from 'react'
import { CardReportedAccount } from './elements'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export const AllreportedaccountModule: React.FC = () => {
  const [listReportedAccount, setListReportedAccount] = useState<string[]>()
  const toast = useToast()
  const router = useRouter()

  useEffect(() => {
    axios
      .get('/api/report')
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
  }, [])

  return (
    <div className="flex flex-col items-center pt-5 gap-4">
      <h1 className="font-bold text-2xl md:text-3xl text-white text-center px-2">
        List Akun yang Memiliki Laporan
      </h1>
      <CardReportedAccount listUser={listReportedAccount || []} />
    </div>
  )
}
