import React from 'react'
import { DeveloperSectionProps } from './interface'
import { Image } from '@chakra-ui/react'

export const DeveloperSection: React.FC<DeveloperSectionProps> = ({
  username,
  profilePictureUrl,
}) => {  
  return (
    <div className="py-[24px] w-full flex justify-center items-center">
      <div className="w-full lg:w-[960px] p-3 text-white border-white border-2 rounded-xl overflow-hidden flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Developer</h2>
        <div className="flex flex-row items-center gap-4">
          <Image
            objectFit="cover"
            src={profilePictureUrl}
            alt={username}
            className="w-[64px] h-[64px] rounded-full"
          />
          <span className="text-xl font-bold">{username}</span>
        </div>
      </div>
    </div>
  )
}