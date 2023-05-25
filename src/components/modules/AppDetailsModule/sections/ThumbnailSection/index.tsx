import React from 'react'
import { ThumbnailSectionProps } from './interface'
import { Button, Image } from '@chakra-ui/react'
import { useAuthContext } from '@contexts'
import Link from 'next/link'

export const ThumbnailSection: React.FC<ThumbnailSectionProps> = ({
  appId,
  title,
  description,
  imageUrl,
  devId,
  isFollowing,
  onFollow,
  onUnfollow,
  onDelete,
}) => {
  const { user } = useAuthContext()
  
  return (
    <div className="pt-[24px] w-full flex justify-center items-center">
      <div className="w-full lg:w-[960px] lg:h-[420px] flex flex-col lg:flex-row text-white border-white border-2 rounded-xl overflow-hidden">
        <Image
          objectFit="cover"
          src={imageUrl}
          alt="App Image"
          className="w-full lg:w-[640px]"
        />
        <div className="p-3 flex flex-col justify-between gap-2">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p>{description}</p>
          </div>
          {
            user && user.id == devId ?
            <div className="flex flex-row justify-end gap-2">
              <Link href={`/app-developer/${appId}`}>
                <Button
                  colorScheme="yellow"
                  variant="solid"
                >
                  Edit
                </Button>
              </Link>
              <Button
                colorScheme="red"
                variant="solid"
                onClick={onDelete}
              >
                Delete
              </Button>
            </div>
            :
            user && user.role === 'USER' &&
            <div className="flex flex-row justify-end">
              <Button
                colorScheme={isFollowing ? "red" : "teal"}
                variant="solid"
                onClick={isFollowing ? onUnfollow : onFollow}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            </div>
          }
          
        </div>
      </div>
    </div>
  )
}