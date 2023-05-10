import React from 'react'
import { ReportedaccountModule } from '@modules'
import { useRouter } from 'next/router'

const Reportedaccount = () => {
  const router = useRouter()
  const { username } = router.query

  return (
    <>
      {username != undefined ? (
        <ReportedaccountModule username={String(username)} />
      ) : (
        <></>
      )}
    </>
  )
}

export default Reportedaccount
