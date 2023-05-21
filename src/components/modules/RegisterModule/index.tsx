import Select from 'react-select'
import { Button, Input, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FormData, FormDefault } from './interface'
import Cookies from 'js-cookie'

export const RegisterModule: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const toast = useToast()
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDefault>({
    defaultValues: {
      username: '',
      password: '',
      role: { value: 'USER', label: 'USER' },
    },
  })
  const onSubmit = (data: FormDefault) => {
    const role = data.role.value
    const { username, password } = data
    const sendData: FormData = {
      username,
      password,
      role,
    }
    console.log(data)
    setIsLoading(true)
    axios
      .post('/api/auth/register', sendData)
      .then((response) => {
        Cookies.set('token', response.data.token)
        toast({
          title: 'Berhasil register!',
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
    <div className="min-h-screen bg-gray-900 text-white py-36">
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
          <div>
            <label>Role</label>
            <Controller
              name="role"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  className="text-black"
                  options={[
                    { value: 'DEVELOPER', label: 'DEVELOPER' },
                    { value: 'USER', label: 'USER' },
                  ]}
                />
              )}
            />
            {errors.role && (
              <p className="text-sm text-red-400">{errors.role.message}</p>
            )}
          </div>
          <Button
            type="submit"
            colorScheme="teal"
            variant="solid"
            isLoading={isLoading}
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  )
}
