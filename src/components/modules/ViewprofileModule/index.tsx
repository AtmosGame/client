import React, { useEffect, useState } from 'react'
import { ParamProps, ViewProfileProps } from './interface'
import {
  ApplicatonsComponent,
  IconEditProfileComponent,
  IconReportComponent,
  MainComponent,
} from './elemets'
import { ChevronDown, ChevronUp } from '@icons'
import { Tooltip } from '@material-tailwind/react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useAuthContext } from '@contexts'

export const ViewprofileModule: React.FC<ParamProps> = ({ username }) => {
  const [userView, setUser] = useState<ViewProfileProps>()
  const [dropdownActive, setDropdownActive] = useState<boolean>(false)
  const toast = useToast()
  const router = useRouter()
  const { user } = useAuthContext()

  useEffect(() => {
    axios
      .get(`/api/view-profile/${username}`)
      .then(function (response) {
        setUser(response.data)
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

        router.push('/')
      })
  }, [])

  function changeActive() {
    setDropdownActive(!dropdownActive)
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center pt-10 px-6 md:px-0 gap-3">
        <div className="w-full md:w-[500px] h-auto flex flex-col z-10 relative">
          {username === user?.username ? (
            <div className="absolute right-2 top-2">
              <IconEditProfileComponent url="#" />
            </div>
          ) : (
            <div className="absolute right-2 top-2">
              <IconReportComponent url="#" />
            </div>
          )}

          <div
            className={`w-full h-full bg-gray-500/25 flex justify-center items-center px-4 md:px-8 py-4 ${
              userView?.role === 'USER' ? `rounded-[12px]` : `rounded-t-[12px]`
            }`}
          >
            <MainComponent user={userView} />
          </div>

          {userView?.role === 'DEVELOPER' ? (
            <div className="w-full h-1/3 bg-gray-500 rounded-b-[12px] relative">
              <h2 className="text-white text-base md:text-lg py-1 pl-5 md:pl-8">
                APPLICATIONS
              </h2>

              <Tooltip
                content="List Applications"
                className="bg-transparent text-yellow-200/75 text-sm font-bold"
              >
                <button
                  className="absolute right-5 bottom-4"
                  onClick={changeActive}
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-400 items-center flex justify-center">
                    {dropdownActive ? (
                      <ChevronUp
                        size="w-6 h-6"
                        fill="#212121"
                        stroke="#212121"
                      />
                    ) : (
                      <ChevronDown
                        size="w-6 h-6"
                        fill="#212121"
                        stroke="#212121"
                      />
                    )}
                  </div>
                </button>
              </Tooltip>
            </div>
          ) : (
            <></>
          )}
        </div>

        {dropdownActive ? (
          <ApplicatonsComponent
            applications={userView?.applications || ''}
            username={userView?.username || ''}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  )
}
