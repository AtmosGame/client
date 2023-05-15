import { Button, Input, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FormData } from './interface'
import Cookies from 'js-cookie'

export const LoginModule: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const toast = useToast()
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: '',
      password: '',
    },
  })
  const onSubmit = (data: FormData) => {
    setIsLoading(true)
    axios
      .post('/api/auth/login', data)
      .then((response) => {
        Cookies.set('token', response.data.token)
        toast({
          title: 'Berhasil login!',
          status: 'success',
          position: 'top',
          duration: 4000,
          isClosable: true,
        })
        router.push('/')
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
  }

  return (
    <div className="min-h-screen text-white py-36">
      <div className="mx-auto max-w-[80%]">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label>Username</label>
            <Controller
              name="username"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => <Input {...field} />}
            />
            {errors.username && (
              <p className="text-sm text-red-400">{errors.username.message}</p>
            )}
          </div>
          <div>
            <label>Password</label>
            <Controller
              name="password"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => <Input {...field} type="password" />}
            />
            {errors.password && (
              <p className="text-sm text-red-400">{errors.password.message}</p>
            )}
          </div>
          <Button
            type="submit"
            colorScheme="teal"
            variant="solid"
            isLoading={isLoading}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  )
}
