import React from 'react'
import { ViewprofileModule } from '@modules'
import { useRouter } from 'next/router'

const Viewprofile = () => {
  const router = useRouter()
  const { username } = router.query

  return (
    <>
      {username != undefined ? (
        <ViewprofileModule username={String(username)} />
      ) : (
        <></>
      )}
    </>
  )
}

export default Viewprofile
