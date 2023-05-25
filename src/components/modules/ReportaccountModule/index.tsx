import { Button, Input, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ParamProps } from './interface';

interface ReportFormData {
  information: string;
}

export const ReportAccountModule: React.FC<ParamProps> = ({ username, usernameReported }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ReportFormData>({
    defaultValues: {
      information: '',
    },
  });

  const onSubmit = (data: ReportFormData) => {
    setIsLoading(true);
    axios
      .post(`/api/reportaccount/${username}/${usernameReported}`, data)
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
    <div className="min-h-screen text-white py-36">
      <div className="mx-auto max-w-[80%]">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div class="grid h-screen place-items-center">
          <h1>Report account {usernameReported}</h1>
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
          </div>
          <Button type="submit" colorScheme="teal" variant="solid" isLoading={isLoading}>
            Report
          </Button>
        </div>
        </form>
      </div>
    </div>
  );
};
