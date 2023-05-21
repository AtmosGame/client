import Select from 'react-select'
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
import { FormData, FormDefault } from './interface'
import Cookies from 'js-cookie'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

export const RegisterModule: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
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
    if (data.password != data.confirm) {
      toast({
        title: 'Password tidak sama!',
        status: 'error',
        position: 'top',
        duration: 4000,
        isClosable: true,
      })
      return
    }
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
    <div className="relative h-screen text-white py-24 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-[30%] z-50">
        <h1 className="text-4xl text-center font-bold pb-6">Register</h1>
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
                  <Input {...field} placeholder="Masukkan username Anda" />
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
                      placeholder="Masukkan password Anda"
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
            <div>
              <label>Confirm Password</label>
              <Controller
                name="confirm"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <InputGroup>
                    <Input
                      {...field}
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Ulangi password Anda"
                    />
                    <InputRightElement>
                      {showConfirmPassword ? (
                        <FaEyeSlash
                          onClick={() => setShowConfirmPassword(false)}
                        />
                      ) : (
                        <FaEye onClick={() => setShowConfirmPassword(true)} />
                      )}
                    </InputRightElement>
                  </InputGroup>
                )}
              />
              {errors.confirm && (
                <p className="text-sm text-red-400">{errors.confirm.message}</p>
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
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        backgroundColor: 'transparent',
                      }),
                      singleValue: (provided) => ({
                        ...provided,
                        color: 'white',
                      }),
                      option: (provided) => ({
                        ...provided,
                        backgroundColor: 'transparent',
                        color: 'black',
                      }),
                    }}
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
            <div className="flex justify-center pt-6">
              <Button
                type="submit"
                colorScheme="teal"
                variant="solid"
                isLoading={isLoading}
              >
                Register
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
