import React, { useEffect, useState } from 'react'
import { DetailReportedProps, ParamProps } from './interface'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export const ReportedaccountModule: React.FC<ParamProps> = ({ username }) => {
  const [reportedaccount, setReportedAccount] = useState<DetailReportedProps>()
  const [isUpdated, setIsUpdated] = useState<boolean>(false)
  const toast = useToast()
  const router = useRouter()

  useEffect(() => {
    axios
      .get(`/api/report/${username}`)
      .then(function (response) {
        const { username, totalReports, listReports } = response.data
        setReportedAccount({
          username: username,
          totalReports: totalReports,
          listReports: listReports,
        })
      })
      .catch(function (error) {
        if (error.response != undefined && error.response.status != undefined) {
          if (error.response.status === 400 || error.response.status === 404) {
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
  }, [isUpdated])

  const handleApproveButton = () => {
    axios
      .post(`/api/report/approve/${username}`)
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
      .delete(`/api/report/reject/${username}/${id}`)
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
        console.log(response.data.haveReport)
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

  return (
    <div className="flex flex-col items-center pt-5 gap-4 w-full">
      <h1 className="font-bold text-2xl md:text-3xl text-[#080B2B] text-center">{`Detail Laporan Akun ${reportedaccount?.username}`}</h1>
      <h2 className="font-bold text-lg md:text-xl text-purple-800">{`Jumlah Laporan: ${reportedaccount?.totalReports}`}</h2>

      <div className="flex flex-col justify-center items-center gap-5 w-full px-5 md:px-0">
        {reportedaccount?.listReports.map((report) => (
          <div
            className="w-full md:w-[350px] h-auto bg-emerald-500 rounded-[10px] px-6 flex flex-col justify-center gap-3 py-4"
            id={report.id.toString()}
          >
            <span className="font-bold">{`${
              report.dateReport[0]
            }-${report.dateReport[1]
              .toString()
              .padStart(2, '0')}-${report.dateReport[2]
              .toString()
              .padStart(2, '0')} ${report.dateReport[3]
              .toString()
              .padStart(2, '0')}:${report.dateReport[4]
              .toString()
              .padStart(2, '0')}:${report.dateReport[5]
              .toString()
              .padStart(2, '0')}`}</span>
            <p className="break-all text-fuchsia-950">{report.information}</p>

            <div className="flex flex-row w-2/3 gap-4">
              <button
                className="w-1/2 bg-green-400 rounded-[10px] py-1 items-center justify-center flex"
                onClick={() => handleApproveButton()}
              >
                <span className="font-bold text-sm">Approve</span>
              </button>

              <button
                className="w-1/2 bg-red-500 rounded-[10px] py-1 items-center justify-center flex"
                onClick={() => handleRejectButton(report.id)}
              >
                <span className="font-bold text-sm text-white">Reject</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
