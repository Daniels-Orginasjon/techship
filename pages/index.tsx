import type { NextPage } from 'next';
import Product from '../components/product/product';
import Products from '../components/product/products';

const Home: NextPage = () => {
  return (
    <div>
      <Products />
    </div>
  );
};

export default Home;
