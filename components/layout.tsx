import Head from 'next/head';
import Navbar from './navbar';
import FooterBar from './footer';
import { useRouter } from 'next/router';
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

  return (
    <>
      <Head>
        <title>{thisPage?.name}</title>
        <link rel="icon" href="./logoTrans.png"></link>
      </Head>
      <div className="flex flex-col">
        <Navbar />
        <div className="grid grid-flow-col min-h-screen m-auto break-words">
          <div className="max-w-sm xl:w-32 lg:w-36 sm:w-32 w-24">
            ADSADSADSADSADSADSADSADSADSADSADSADSADSADS
          </div>
          <div className="max-w-7xl xl:max-w-5xl lg:max-w-3xl sm:max-w-lg">
            {children}
          </div>
          <div className="max-w-sm xl:w-32 lg:w-36 sm:w-32 w-24">
            ADSADSADSADSADSADSADSADASDSADSADSADSADSADS
          </div>
        </div>
        <div className="relative bottom-0 pt-60">
          <FooterBar />
        </div>
      </div>
    </>
  );
};

export default Layout;
