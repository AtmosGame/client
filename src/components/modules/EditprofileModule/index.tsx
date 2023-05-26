import React, { useEffect, useState } from 'react'
import {
  Button,
  useToast,
} from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useAuthContext } from '@contexts'
import { ParamProps, ViewProfileProps } from './interface'
import Cookies from 'js-cookie'

interface ProfileFormData {
    profilePicture: string;
    bio: string;
  }

export const EditprofileModule: React.FC<ParamProps> = ({ username }) => {
  const [userView, setUser] = useState<ViewProfileProps>()
  // const [dropdownActive, setDropdownActive] = useState<boolean>(false)
  const toast = useToast()
  const router = useRouter()
  // eslint-disable-next-line no-unused-vars
  const { user, isAuthenticated } = useAuthContext()
  
  console.log(userView)
  console.log(user)

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
    } else{
      onSubmit({profilePicture: '', bio: ''})
  }})

  // function changeActive() {
  //   setDropdownActive(!dropdownActive)
  // }

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
    <div className="relative h-screen text-white py-24 lg:py-36 overflow-hidden">
      <div className="relative max-w-[80%] mx-auto space-y-12 z-10">
        <div className="flex gap-4 items-center select-none">
          <h1 className="font-bold text-5xl">Edit Profile
          </h1>
        </div>
        <h1 className="font-bold text-5xl">{username}
          </h1>
      </div>
      <div className="z-0 w-full">
        <div className="absolute top-0 -left-4 w-[500px] h-[500px] bg-purple-300 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-[500px] h-[500px] bg-emerald-300 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-[500px] h-[500px] bg-pink-300 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        <table className="flex justify-center">
          <tbody>
              <tr>
                <td className="text-slate-50 mt-2">Profile Picture</td>
              </tr>
              <tr>
                  <div className="items-center justify-center flex flex-col mb-1 mt-1">
                  </div>
                  <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file"></input>
              </tr>
              <tr>
                  <td className="text-slate-50">Bio</td>
              </tr>
              <tr>
                  <td><input type="text" name="bio" placeholder="Bio" className="form-control text-sm rounded-lg p-3 w-full text-black"></input></td>
              </tr>

              <div className="flex justify-center pt-6">
              <Button
                type="submit"
                colorScheme="teal"
                variant="solid"
              >
                Edit Profile
              </Button>
            </div>

          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}
