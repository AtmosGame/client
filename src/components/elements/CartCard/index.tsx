import React, { useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'
import { CartCardProps } from './interface'

export const CartCard: React.FC<CartCardProps> = ({
  id,
  addDate,
  appId,
  appName,
  appPrice,
  deleteCartHandler,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <div className="rounded-sm bg-gray-600/25 backdrop-blur-md drop-shadow-lg p-4 text-white flex justify-between items-center">
      <div>
        <p className="text-xl font-semibold">{appName}</p>
        <p className="text-md text-gray-300">
          {appPrice > 0 ? `IDR ${appPrice.toLocaleString()}` : 'Free'}
        </p>
      </div>
      <button
        className="bg-red-500 p-2 rounded-md w-fit h-fit hover:scale-110 transition-all active:bg-red-500/75 duration-300 hover:shadow-lg hover:shadow-red-500/25"
        onClick={() => {
          setIsLoading(true)
          deleteCartHandler(appId)
          setIsLoading(false)
        }}
      >
        {!isLoading ? (
          <TrashIcon className="h-6 w-6" />
        ) : (
          <div className="border-inherit h-6 w-6 animate-spin rounded-full border-b-2"></div>
        )}
      </button>
    </div>
  )
}
