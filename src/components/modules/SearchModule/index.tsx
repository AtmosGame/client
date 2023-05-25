import React from 'react'
import { useRouter } from 'next/router'
// import {HeroSection, FAQSection} from './sections
// import {} from './module-elements'

export const SearchModule: React.FC = () => {
  const router = useRouter()
  const { keyword } = router.query

  return (
    <>
      <div className="min-h-screen text-white py-36">
        <div className="mx-auto max-w-[80%]">
          <h1>Search Results for: {keyword}</h1>
        </div>
      </div>
    </>
  )
}
