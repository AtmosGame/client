import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Inter } from 'next/font/google'
import { AuthContextProvider } from '@contexts'

const inter = Inter({ subsets: ['latin'] })

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <AuthContextProvider>
        <main className={`${inter.className} w-full min-h-screen bg-gray-900`}>
          <Component {...pageProps} />
        </main>
      </AuthContextProvider>
    </ChakraProvider>
  )
}

export default App
