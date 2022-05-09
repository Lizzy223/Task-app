import { ChakraProvider } from '@chakra-ui/react'
import { Auth0Provider } from "@auth0/auth0-react";

function MyApp({ Component, pageProps }) {
  return (
    <Auth0Provider 
    domain="dev-e6601jjl.us.auth0.com"
    clientId="4tVg5L11NWDNbH2Dp9iIlDOFli6sVaRf" >
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Auth0Provider>
  )
}

export default MyApp