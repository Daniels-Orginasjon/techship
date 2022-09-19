import type { NextPage } from 'next';
import SlideShow from '../components/slideshows/slideshow';

const Home: NextPage = () => {
  return (
    <div className="min-h-full">
      <SlideShow />
    </div>
  );
};

export default Home;
