import React, { useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useAuthContext } from '@contexts'
import { ParamProps, ViewProfileProps } from './interface'
import Cookies from 'js-cookie'
import { set } from 'react-hook-form'

interface ProfileFormData {
    profilePicture: string;
    bio: string;
  }

export const EditprofileModule: React.FC<ParamProps> = ({ username }) => {
    const [userView, setUser] = useState<ViewProfileProps>()
  const [dropdownActive, setDropdownActive] = useState<boolean>(false)
  const toast = useToast()
  const router = useRouter()
  const { user, isAuthenticated } = useAuthContext()

  useEffect(() => {
    if(isAuthenticated===false){
        toast({
            title: 'Anda harus login terlebih dahulu!',
            status: 'error',
            position: 'top',
            duration: 4000,
            isClosable: true,
          })
          router.push('/login')
    } else if(user?.role === 'ADMIN' || user?.role === undefined){
        toast({
            title: 'Anda tidak dapat mengakses halaman ini!',
            status: 'error',
            position: 'top',
            duration: 4000,
            isClosable: true,
          })
          console.log(user?.role)
          router.push('/')
    } else{
    //     axios.post(`/api/update-profile/${username}`,{
    //         headers: {
    //             Authorization: `Bearer ${Cookies.get('token')}}`},
    //     }).then(function (response){
    //         setUser(response.data)
    // })
  }})

  function changeActive() {
    setDropdownActive(!dropdownActive)
  }

  const onSubmit= (data: ProfileFormData) => {
    axios.post(`/api/update-profile/${username}`,{
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}}`},
    }).then(function (response){
        setUser(response.data)
        toast({
            title: 'Profile berhasil diupdate!',
            status: 'success',
            position: 'top',
            duration: 4000,
            isClosable: true,
        })
        router.push(`/viewprofile/${username}`)
})
  }


  return (
    <>
    <div className="border-b-2 block md:flex">
      <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
      <div className="rounded  shadow p-6">
        <div className="pb-6">
          <label htmlFor="name" className="font-semibold text-gray-700 block pb-1">Name</label>
          <div className="flex">
            <input disabled id="username" className="border-1  rounded-r px-4 py-2 w-full" type="text" value="Jane Name" />
          </div>
        </div>
        <div className="pb-4">
          <label htmlFor="about" className="font-semibold text-gray-700 block pb-1">Email</label>
          <input disabled id="email" className="border-1  rounded-r px-4 py-2 w-full" type="email" value="example@example.com" />
          <span className="text-gray-600 pt-4 block opacity-70">Personal login information of your account</span>
        </div>
      </div>
    </div>
  </div>
      {/* <div className="flex flex-col items-center justify-center pt-10 px-6 md:px-0 gap-3">
        <div className="w-full md:w-[500px] h-auto flex flex-col z-10 relative">
          {username === user?.username ? 
          (
            <div className='absolute right-2 top-2'>
            </div>
          ):(
            <div className='absolute right-2 top-2'>
            </div>
          )}

          <div
            className={`w-full h-full bg-gray-500/25 flex justify-center items-center px-4 md:px-8 py-4 ${
              userView?.role === 'USER' ? `rounded-[12px]` : `rounded-t-[12px]`
            }`}
          >
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
      </div> */}
    </>
  )
}
