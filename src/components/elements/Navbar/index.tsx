import { Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useWindowSize } from '@hooks'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { MenuItem } from './MenuItem'

export const Navbar: React.FC = () => {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { width } = useWindowSize()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [router.pathname])

  return (
    <nav className="fixed z-50 w-full">
      <div className={`transition-all bg-slate-800`}>
        <div className="mx-auto flex max-w-[80%] justify-between py-[22px]">
          <div className="flex select-none items-center gap-2 text-lg">
            <p className={`font-bold text-emerald-300`}>ATMOS</p>
          </div>
          <button
            aria-label="Navigation Bar Button"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6 text-white" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-white" />
            )}
          </button>
          <div className={`hidden items-center gap-[100px] lg:flex`}>
            <MenuItem />
          </div>
        </div>
      </div>
      <Transition
        show={isMenuOpen}
        enter="transition duration-500 ease-out"
        enterFrom={`transform ${
          width > 500 ? 'translate-x-full' : 'scale-y-0'
        }`}
        enterTo={`transform ${width > 500 ? '-translate-x-0' : 'scale-y-100'}`}
        leave="transition duration-500 ease-out"
        leaveFrom={`transform ${
          width > 500 ? '-translate-x-0' : 'scale-y-100'
        }`}
        leaveTo={`transform ${width > 500 ? 'translate-x-full' : 'scale-y-0'}`}
      >
        <div
          className={`${
            width > 500 ? 'max-w-[250px]' : 'max-w-[500px]'
          } absolute right-0 z-40 flex h-screen w-full flex-col gap-7 bg-slate-800 px-10 pt-5 transition duration-500 ease-in-out`}
        >
          <MenuItem />
        </div>
      </Transition>
      {isMenuOpen && (
        <div
          className="h-screen bg-mineshaft-900/40 transition-opacity"
          onClick={() => {
            setIsMenuOpen(false)
          }}
        />
      )}
    </nav>
  )
}
