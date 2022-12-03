import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import WithSubnavigation from '@/app/components/navbar'
import { SessionProvider } from "next-auth/react"
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <SessionProvider>
        <WithSubnavigation>
          <Component {...pageProps} />
        </WithSubnavigation>
      </SessionProvider>
    </ChakraProvider>
  )
}
