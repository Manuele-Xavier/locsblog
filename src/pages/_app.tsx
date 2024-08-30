import { AppProps } from "next/app";
import '@/styles/globals.css';
import Header from "@/components/header";
import Footer from "@/components/footer"

import { ApolloProvider } from '@apollo/client';
import client from '@/apollo-client'
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <Header />
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
      <Footer />
    </div>
  )
}
export default App