import { ListReportedAccounts } from '../../interface'
import React from 'react'
import type { NextPage } from 'next'
import { ReportedaccountModule } from 'src/components/modules/ReportedaccountModule'
import { useRouter } from 'next/router'

export const CardReportedAccount: React.FC<ListReportedAccounts> = ({
  listUser,
}) => {
  const router = useRouter()

  const handleClickCard = (username: string) =>
    router.push(`/reportedaccount/${username}`)

  return (
    <div className="flex flex-col items-center justify-center gap-5 px-6">
      {listUser.length == 0 ? (
        <h3 className="text-emerald-400 font-bold md:text-lg">
          Belum ada user yang memiliki laporan!
        </h3>
      ) : (
        <>
          {listUser.map((username) => (
            <button
              className="w-[250px] md:w-[350px] h-auto bg-fuchsia-700 rounded-[10px]"
              onClick={() => handleClickCard(username)}
            >
              <div className="py-2 px-6 flex items-center justify-center break-all">
                <h3 className="text-white font-bold md:text-lg">{username}</h3>
              </div>
            </button>
          ))}
        </>
      )}
    </div>
  )
}
