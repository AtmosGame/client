import React, { useEffect, useState } from 'react'
import { DetailReportedProps, ParamProps } from './interface'
import axios from 'axios'
import { Button, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useAuthContext } from '@contexts'
import Cookies from 'js-cookie'

export const ReportedaccountModule: React.FC<ParamProps> = ({ username }) => {
  const [reportedaccount, setReportedAccount] = useState<DetailReportedProps>()
  const [isUpdated, setIsUpdated] = useState<boolean>(false)
  const toast = useToast()
  const router = useRouter()
  const { user, isAuthenticated } = useAuthContext()

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
    } else if (user?.role !== 'ADMIN' && user?.role !== undefined) {
      toast({
        title: 'Anda tidak memiliki akses ke halaman ini!',
        status: 'error',
        position: 'top',
        duration: 4000,
        isClosable: true,
      })
      router.push('/')
    } else if (user?.role === 'ADMIN') {
      axios
        .get(`/api/report/${username}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}}`,
          },
        })
        .then(function (response) {
          const { username, totalReports, listReports } = response.data
          setReportedAccount({
            username: username,
            totalReports: totalReports,
            listReports: listReports,
          })
        })
        .catch(function (error) {
          if (
            error.response != undefined &&
            error.response.status != undefined
          ) {
            if (
              error.response.status === 400 ||
              error.response.status === 404
            ) {
              toast({
                title: `${error.response.data.responseMessage}`,
                status: 'error',
                position: 'top',
                duration: 4000,
                isClosable: true,
              })
            } else {
              toast({
                title: 'Terjadi kesalahan! Segera hubungi Contact Person',
                status: 'error',
                position: 'top',
                duration: 4000,
                isClosable: true,
              })
            }
          } else {
            toast({
              title: 'Terjadi kesalahan! Segera hubungi Contact Person',
              status: 'error',
              position: 'top',
              duration: 4000,
              isClosable: true,
            })
          }

          router.push('/allreportedaccount')
        })
    } else {
      // do nothing
    }
  }, [isUpdated, user])

  const handleApproveButton = () => {
    axios
      .delete(`/api/report/approve/${username}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}}`,
        },
      })
      .then(function (response) {
        toast({
          title: `${response.data}`,
          status: 'error',
          position: 'top',
          duration: 4000,
          isClosable: true,
        })
      })
      .catch(function (error) {
        toast({
          title: 'Terjadi kesalahan! Segera hubungi Contact Person',
          status: 'error',
          position: 'top',
          duration: 4000,
          isClosable: true,
        })
      })
      .finally(function () {
        router.push('/allreportedaccount')
      })
  }

  const handleRejectButton = (id: number) => {
    axios
      .delete(`/api/report/reject/${username}/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}}`,
        },
      })
      .then(function (response) {
        if (response.data.haveReport) {
          setIsUpdated(!isUpdated)
        } else {
          toast({
            title: `${username} does not have report`,
            status: 'error',
            position: 'top',
            duration: 4000,
            isClosable: true,
          })

          router.push('/allreportedaccount')
        }
      })
      .catch(function (error) {
        toast({
          title: 'Terjadi kesalahan! Segera hubungi Contact Person',
          status: 'error',
          position: 'top',
          duration: 4000,
          isClosable: true,
        })

        router.push('/allreportedaccount')
      })
  }

  const handleReportedAccountButton = () => {
    router.push('/allreportedaccount')
  }

  const optionsDate: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }

  function formateDate(dateReport: string) {
    try {
      return new Intl.DateTimeFormat('id-ID', optionsDate).format(
        new Date(dateReport)
      )
    } catch (error) {
      // do nothing
    }
  }

  return (
    <>
      {user?.role === 'ADMIN' ? (
        <div className="flex flex-col items-center pt-5 gap-4 w-full">
          <div className="pb-2">
            <Button
              variant="solid"
              className="bg-fuchsia-700 text-white"
              onClick={handleReportedAccountButton}
            >
              List Reported Account
            </Button>
          </div>
          <h1 className="font-bold text-2xl md:text-3xl text-white text-center">{`Detail Laporan Akun ${reportedaccount?.username}`}</h1>
          <h2 className="font-bold text-lg md:text-xl text-fuchsia-500">{`Jumlah Laporan: ${reportedaccount?.totalReports}`}</h2>

          <div className="flex flex-col justify-center items-center gap-5 w-full px-5 md:px-0">
            {reportedaccount?.listReports.map((report, key) => (
              <div
                className="w-full md:w-[350px] h-auto bg-gray-500/50 rounded-[10px] px-6 flex flex-col justify-center gap-3 py-4"
                id={report.id.toString()}
                key={key}
              >
                <span className="font-bold text-emerald-300/90 text-sm">
                  {`${formateDate(report.dateReport)}`}
                </span>
                <p className="break-all font-medium text-white text-lg">
                  {report.information}
                </p>

                <div className="flex flex-row w-2/3 gap-4">
                  <button
                    className="w-1/2 bg-green-400 rounded-[10px] py-1 items-center justify-center flex"
                    onClick={() => handleApproveButton()}
                  >
                    <span className="font-bold text-sm text-gray-750">
                      Approve
                    </span>
                  </button>

                  <button
                    className="w-1/2 bg-red-500/75 rounded-[10px] py-1 items-center justify-center flex"
                    onClick={() => handleRejectButton(report.id)}
                  >
                    <span className="font-bold text-sm text-gray-50">
                      Reject
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
