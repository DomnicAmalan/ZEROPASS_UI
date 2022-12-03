import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import WithSubnavigation from '@/app/components/navbar'
import { SessionProvider } from "next-auth/react"
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";
import { connectors, supportedChainIds } from '@/app/config/metamask'
import { Provider } from 'react-redux';
import store from '@/app/store/index'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        {/*// @ts-ignore */}
        <ThirdwebWeb3Provider
          supportedChainIds={supportedChainIds}
          connectors={connectors}
        >
          <SessionProvider>
            <WithSubnavigation>
              <Component {...pageProps} />
            </WithSubnavigation>
          </SessionProvider>
        </ThirdwebWeb3Provider>
      </ChakraProvider>
    </Provider>
  )
}
