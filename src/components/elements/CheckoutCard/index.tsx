import React, { useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'
import { CheckoutCardProps } from './interface'

export const CheckoutCard: React.FC<CheckoutCardProps> = ({ id }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <div className="rounded-sm bg-gray-600/25 backdrop-blur-md drop-shadow-lg p-4 text-white flex justify-between items-center">
      <div>
        <p className="text-xl font-semibold">{id}</p>
      </div>
      <button
        className="bg-red-500 p-2 rounded-md w-fit h-fit hover:scale-110 transition-all active:bg-red-500/75 duration-300 hover:shadow-lg hover:shadow-red-500/25"
        onClick={() => {
          setIsLoading(true)
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
