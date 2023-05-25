import { Button, Input, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FormData } from './interface'
import Link from 'next/link'

export const SearchUserModule: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const toast = useToast()
  const [data, setData] = useState([])
  const [showCard, setShowCard] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      username: '',
    },
  })
  const onSubmit = (data: FormData) => {
    setShowCard(false)
    // console.log('====================================');
    console.log(data.username == '')
    // console.log('====================================');

    if (data.username == '') {
      toast({
        title: 'Masukkan username!',
        status: 'error',
        position: 'top',
        duration: 4000,
        isClosable: true,
      })
    } else {
      setIsLoading(true)
      axios
        .post('/api/user/search', data, {})
        .then((response) => {
          console.log(response.data[0])
          setData(response.data)

          toast({
            title: 'Berhasil search!',
            status: 'success',
            position: 'top',
            duration: 4000,
            isClosable: true,
          })

          // router.push('/')
        })
        .catch((error) => {
          toast({
            title: 'Terjadi kesalahan! Segera hubungi Contact Person',
            status: 'error',
            position: 'top',
            duration: 4000,
            isClosable: true,
          })
        })
      setIsLoading(false)
      setShowCard(true)
      reset()
    }

    // console.log(data.username == "");
  }

  return (
    <div className="relative h-screen bg-gray-900 text-white py-24 lg:py-36 overflow-hidden ">
      <div className="mx-auto max-w-[50%]">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="mb-10 flex justify-between items-center gap-4 z-50">
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Masukkan username"
                  onChange={(e) => {
                    field.onChange(e)
                    setShowCard(false) // Hide the card when the input changes
                  }}
                />
              )}
            />
            {errors.username && (
              <p className="text-sm text-red-400">{errors.username.message}</p>
            )}

            <Button
              type="submit"
              colorScheme="teal"
              variant="solid"
              isLoading={isLoading}
              className="px-4 py-2 font-bold rounded-md bg-emerald-400 text-gray-900 active:bg-emerald-600 transition-all hover:shadow-lg hover:shadow-emerald-400/25 z-50"
            >
              Search
            </Button>
          </div>
        </form>

        {showCard && data.length == 0 && (
          <div className="text-l font-bold text-gray-900 truncate dark:text-white">
            {' '}
            Username tidak ditemukan{' '}
          </div>
        )}

        {data.map((user: any, id: number) => (
          <div key={id} className="w-full max-w-md px-4 bg-white border border-gray-800 rounded-lg shadow m:p-8 dark:bg-white-800 dark:border-gray-700 py-1 space-y-2 my-2 z-50 active:bg-white-600 transition-all hover:shadow-lg hover:shadow-white-400/25 ">
            {' '}
            <Link href={`/viewprofile/${user.username}`}>
              <div className="flow-root  z-50">
                <ul
                  role="list"
                  className="divide-y divide-gray-200 dark:divide-gray-700  z-50"
                >
                  <li className="py-3 s:py-4  z-50">
                    <div className="flex items-center space-x-2  z-50">
                      <div className="flex-1 min-w-0 z-50">
                        <p className="text-l font-large text-gray-900 truncate dark:text-gray  z-50">
                          <div key={id}>
                            {' '}
                            {user.username}{' '}
                            {user.active == false && (
                              <div className="text-l font-bold text-gray-900 truncate dark:text-red">
                                {' '}
                                Blocked{' '}
                              </div>
                            )}{' '}
                          </div>
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="z-0 w-full">
        <div className="absolute top-0 -left-4 w-[500px] h-[500px] bg-purple-300 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-[500px] h-[500px] bg-emerald-300 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-[500px] h-[500px] bg-pink-300 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  )
}
