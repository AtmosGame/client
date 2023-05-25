/* eslint-disable no-unused-vars */
import { Button, Input, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ParamProps } from './interface';
import { useAuthContext } from '@contexts';

interface ReportFormData {
  information: string;
}

export const ReportAccountModule: React.FC<ParamProps> = ({ username, usernameReported }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  const router = useRouter();
  const { user, isAuthenticated } = useAuthContext()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ReportFormData>({
    defaultValues: {
      information: '',
    },
  });

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
    } else if (user?.role === 'ADMIN' && user?.role === undefined) {
      toast({
        title: 'Anda tidak memiliki akses ke halaman ini!',
        status: 'error',
        position: 'top',
        duration: 4000,
        isClosable: true,
      })
      router.push(`/viewprofile/${usernameReported}`)
    } else {
      onSubmit({ information: '' })
    }
  }, [user, isAuthenticated])

  const onSubmit = (data: ReportFormData) => {
    setIsLoading(true);
    axios
      .post(`/api/report-user/${username}/${usernameReported}`, data)
      .then((response) => {
        toast({
          title: 'Berhasil report!',
          status: 'success',
          position: 'top',
          duration: 4000,
          isClosable: true,
        });
        router.push('/');
      })
      .catch((error) => {
        toast({
          title: 'Informasi mengenai report tidak boleh kosong!',
          status: 'error',
          position: 'top',
          duration: 4000,
          isClosable: true,
        });
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="relative h-screen text-white py-24 lg:py-36 overflow-hidden">
      <div className="mx-auto max-w-[80%] z-50">
        <h1 className='flex items-center justify-center text-2xl'>Report Account</h1>
          <h1 className='flex items-center justify-center '>{usernameReported}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label>Information</label>
            <Controller
              name="information"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => <Input {...field} placeholder="Enter report information here" />}
            />
            {errors.information && (
              <p className="text-sm text-red-400">{errors.information.message}</p>
            )}
          <Button type="submit" colorScheme="teal" variant="solid" isLoading={isLoading}>
            Report
          </Button>
        </div>
        </form>
      </div>
    </div>
  );
};
