import React from 'react'
import { UserProps } from '../../interface'
import { HiUserCircle } from 'react-icons/hi'
import Image from 'next/image'

export const MainComponent: React.FC<UserProps> = ({ user }) => {
  const imageLoader = ({src}: {src: any}) => {
      return src
  }

  return (
    <div className="w-full h-full flex flex-row items-center">
    <div>
      {user?.profilePicture == '' || user?.profilePicture == null ? (
        <HiUserCircle className="w-16 md:w-16 h-16 md:h-16 rounded-full text-emerald-400" />
      ) : (
        <Image loader={imageLoader} src={user.profilePicture} width={80} height={80} className='"w-16 h-16 rounded-full' alt='profilePicture' />
      )}
    </div>

    <div className="w-full pl-4 flex flex-col">
      <h1 className="text-2xl md:text-3xl font-bold text-emerald-400">
        {user?.username}
      </h1>

      <article className="pt-1">
        <p className="text-gray-300 text-sm md:text-base">{user?.bio}</p>
      </article>
    </div>
  </div>
  )
}
