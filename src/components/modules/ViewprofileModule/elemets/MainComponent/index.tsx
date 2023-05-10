import React from 'react'
import { UserProps } from '../../interface'
import { HiUserCircle } from 'react-icons/hi'

export const MainComponent: React.FC<UserProps> = ({ user }) => (
  <div className="w-full h-full flex flex-row items-center">
    <div>
      {user?.profilePicture == '' ? (
        <HiUserCircle className="w-16 md:w-20 h-16 md:h-20 rounded-full text-green-600" />
      ) : (
        <></>
      )}
    </div>

    <div className="w-full pl-4 flex flex-col">
      <h1 className="text-2xl md:text-3xl font-bold text-white">
        {user?.username}
      </h1>

      <article className="pt-1">
        <p className="text-[#ffeffe] text-sm md:text-base">{user?.bio}</p>
      </article>
    </div>
  </div>
)
