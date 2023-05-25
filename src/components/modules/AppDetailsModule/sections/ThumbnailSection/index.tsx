import React from 'react'
import { ThumbnailSectionProps } from './interface'
import { Button, Image } from '@chakra-ui/react'

export const ThumbnailSection: React.FC<ThumbnailSectionProps> = ({
  title,
  description,
  imageUrl,
  isFollowing,
  onFollow,
  onUnfollow,
}) => {
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
          <div className="flex flex-row justify-end">
          <Button
            colorScheme={isFollowing ? "red" : "teal"}
            variant="solid"
            onClick={isFollowing ? onUnfollow : onFollow}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
          </div>
        </div>
      </div>
    </div>
  )
}