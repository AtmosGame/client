import React from 'react'
import { AppDetailsModule } from '@modules'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const AppDetails: NextPage = () => {
  const router = useRouter()  
  return <AppDetailsModule appId={Number(router.query.id)} />
}

export default AppDetails
