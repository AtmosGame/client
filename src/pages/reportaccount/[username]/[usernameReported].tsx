import React from 'react'
import type { NextPage } from 'next'
import { ReportAccountModule } from '@modules'
import { useRouter } from 'next/router'


const Reportaccount = () => {
    const router = useRouter()
    const { username, usernameReported } = router.query
  
    return (
      <>
        {username != undefined ? (
          <ReportAccountModule username={String(username)} usernameReported={String(usernameReported)} />
        ) : (
          <></>
        )}
      </>
    )
  }
  
  export default Reportaccount
