import React from 'react'
import { EditprofileModule } from '@modules'
import { useRouter } from 'next/router'

const Editprofile = () => {
  const router = useRouter()
  const { username } = router.query

  return (
    <>
      {username != undefined ? (
        <EditprofileModule username={String(username)} />
      ) : (
        <></>
      )}
    </>
  )
}

export default Editprofile
