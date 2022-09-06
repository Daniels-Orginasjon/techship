import Head from 'next/head'
import Navbar from './navbar'
import FooterBar from './footer'
import {useRouter} from 'next/router'
import { navPages } from '../lib/server/pages';

export interface LayoutProps {
  children: JSX.Element;
}


const Layout = ({ children }: LayoutProps) => {
  let router = useRouter();

  let currentPage = router.pathname;
  let thisPage = navPages.find((item) => {
    return item.href.toLowerCase() === currentPage;
  });

  console.log(navPages)
    return (
        <>
            <Head>
                <title>{thisPage?.name}</title>
                <link rel="icon" href="./wallah.jfif"></link>
            </Head>
            <div className='min-h-screen flex flex-col'>
        <Navbar/>
            <div className='min-h-100vh flex'>{children}</div>
                <FooterBar></FooterBar>
                </div>
</>
    )
}

export default Layout;