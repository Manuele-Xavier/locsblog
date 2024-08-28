import { AppProps } from "next/app";
import '@/styles/globals.css';
import Header from "@/components/header";

const App = ({Component, pageProps}: AppProps)=>{
    return(
      <div>
        <Header/>
        <Component {...pageProps}/>
      </div>
    )
  }
  export default App