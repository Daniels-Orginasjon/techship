import Head from "next/head";
import Navbar from "./navbar";
import FooterBar from "./footer";
import { useRouter } from "next/router";
import { navPages } from "../lib/server/pages";

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
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="min-h-screen">{children}</div>
        <div className="relative bottom-0 pt-60">
          <FooterBar></FooterBar>
        </div>
      </div>
    </>
  );
};

export default Layout;
