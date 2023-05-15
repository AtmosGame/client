import React from 'react'
import { ListApplicationsProps } from '../../interface'
import { AiTwotoneAppstore } from 'react-icons/ai'

export const ApplicatonsComponent: React.FC<ListApplicationsProps> = ({
  applications,
  username,
}) => (
  <>
    <div className="w-full md:w-[500px] h-auto bg-gray-500 rounded-[12px] flex flex-row items-center px-5 md:px-8 py-4">
      <div className="items-center">
        <AiTwotoneAppstore className="w-10 md:w-12 h-10 md:h-12 text-white" />
      </div>

      <div className="ml-4 items-center">
        <h3 className="text-fuchsia-50 text-sm md:text-base">
          {applications == ''
            ? `Belum ada aplikasi yang pernah dibuat oleh ${username}`
            : applications}
        </h3>
      </div>
    </div>
  </>
)
