import React, { useState, useEffect } from 'react'
import { VerificationSectionProps } from './interface'
import { App } from '../../interface'
import { Button, Spinner, useToast } from '@chakra-ui/react'
import Link from 'next/link'
import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'

export const VerificationSection: React.FC<VerificationSectionProps> = () => {
  const toast = useToast()
  const [appList, setAppList] = useState<App[] | 'forbidden' | null>(null)

  useEffect(() => {
    axios
      .get(`/api/verification`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      })
      .then((response) => {
        setAppList(response.data)
      })
      .catch((error: AxiosError) => {
        if (error.response && error.response.status === 403) {
          setAppList('forbidden')
        } else {
          toast({
            title: 'Terjadi kesalahan ketika mendapatkan data aplikasi',
            status: 'error',
            position: 'top',
            duration: 4000,
            isClosable: true,
          })
        }
      })
  }, [])

  if (appList === null) {
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
  } else if (appList === 'forbidden') {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <span className="text-3xl text-white">Forbidden</span>
      </div>
    )
  } else {
    return (
      <div className="py-[24px] lg:px-[24px] w-full flex flex-col gap-2 items-center">
        {appList.map((app, index) => {
          return (
            <div
              className="w-full flex flex-row items-center justify-between p-3 text-white border-white border-2 rounded-xl"
              key={index}
            >
              <span>{app.name}</span>
              <Link href={`/verification/${app.id}`}>
                <Button colorScheme="teal" variant="solid">
                  Details
                </Button>
              </Link>
            </div>
          )
        })}
      </div>
    )
  }
}
