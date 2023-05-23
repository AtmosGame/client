import {Button, Input, useToast} from '@chakra-ui/react'
import { useAuthContext } from '@contexts'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, {useEffect, useState} from 'react'
import {Controller, useForm} from "react-hook-form";
import { FormData } from './interface'

export const SecretTokenModule: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { user, isAuthenticated } = useAuthContext()
    const toast = useToast()
    const router = useRouter()

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            tokenName: '',
        },
    })
    const onSubmit = (data: FormData) => {
        setIsLoading(true)
        axios
            .post('/api/secret-token', data)
            .then((response) => {
                toast({
                    title: 'Berhasil menambahkan secret token!',
                    status: 'success',
                    position: 'top',
                    duration: 4000,
                    isClosable: true,
                })
                router.push('/secret-token')
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
        <div className="relative h-screen text-white py-24 lg:py-36 overflow-hidden">
            <div className="relative max-w-[80%] mx-auto space-y-12 z-10">
                <div className="flex justify-center gap-4 items-center select-none">
                    <h1 className="font-bold text-5xl">
                    <span className="text-emerald-400">
                      Add Secret Token
                    </span>
                    </h1>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div className="my-20 mx-60">
                    <Controller
                        name="tokenName"
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field }) => <Input {...field} />}
                    />
                    {errors.tokenName && (
                        <p className="text-sm text-red-400">{errors.tokenName.message}</p>
                    )}
                </div>
                <Button
                    type="submit"
                    colorScheme="teal"
                    variant="solid"
                    isLoading={isLoading}
                >
                    Submit
                </Button>
            </form>
            <div className="z-0 w-full">
                <div className="absolute top-0 -left-4 w-[500px] h-[500px] bg-purple-300 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-[500px] h-[500px] bg-emerald-300 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-[500px] h-[500px] bg-pink-300 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>
        </div>
    )
}
