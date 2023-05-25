import React from 'react'
import { AppDetailsModule } from '@modules'
import type { GetServerSideProps, NextPage } from 'next'

// eslint-disable-next-line react/prop-types
const AppDetails: NextPage<{id:string}> = ({ id }) => {
  return <AppDetailsModule appId={Number(id)} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query
  return {
    props: {
      id
    }
  }
}

export default AppDetails
