import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'

function MyApp({ Component, pageProps }: AppProps) {

  return <Layout><div className='min-h-100%'><Component {...pageProps} /></div></Layout>
}

export default MyApp
