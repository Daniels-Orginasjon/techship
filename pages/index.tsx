import type { NextPage } from 'next';
import Script from 'next/script';
import SlideShow from '../components/slideshows/slideshow';

const Home: NextPage = () => {
  return (
    <div className="min-h-full">
      <SlideShow />

      {/* <Script
        async
        src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      ></Script>
      <ins
        className="adsbygoogle"
        data-ad-client="ca-pub-987************676"
        data-ad-slot="776****95"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script> */}
    </div>
  );
};

export default Home;
