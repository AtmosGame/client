import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FormData } from './interface'
import Cookies from 'js-cookie'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

export const LoginModule: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
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
          title: 'Login successfully!',
          status: 'success',
          position: 'top',
          duration: 4000,
          isClosable: true,
        })
        router.push('/')
      })
      .catch((error) => {
        toast({
          title: 'There is an error! Call the Contact Person immediately',
          status: 'error',
          position: 'top',
          duration: 4000,
          isClosable: true,
        })
      })
    setIsLoading(false)
  }

  return (
    <div className="relative h-screen text-white py-24 lg:py-36 overflow-hidden">
      <div className="mx-auto max-w-[30%] z-50">
        <h1 className="text-4xl text-center font-bold pb-6">Login</h1>
        <div className="backdrop-blur-md bg-white/5 border-[1px] border-white rounded-xl p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div>
              <label>Username</label>
              <Controller
                name="username"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Input {...field} placeholder="Enter your username" />
                )}
              />
              {errors.username && (
                <p className="text-sm text-red-400">
                  {errors.username.message}
                </p>
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
                render={({ field }) => (
                  <InputGroup>
                    <Input
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                    />
                    <InputRightElement>
                      {showPassword ? (
                        <FaEyeSlash onClick={() => setShowPassword(false)} />
                      ) : (
                        <FaEye onClick={() => setShowPassword(true)} />
                      )}
                    </InputRightElement>
                  </InputGroup>
                )}
              />
              {errors.password && (
                <p className="text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex justify-center pt-6">
              <Button
                type="submit"
                colorScheme="teal"
                variant="solid"
                isLoading={isLoading}
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="z-0 w-full">
        <div className="absolute top-0 -left-4 w-[500px] h-[500px] bg-purple-300 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-[500px] h-[500px] bg-emerald-300 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-[500px] h-[500px] bg-pink-300 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  )
}
