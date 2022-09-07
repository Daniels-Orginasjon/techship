import type { NextPage } from 'next';
import Product from '../components/product/product';
import Products from '../components/product/products';

const Home: NextPage = () => {
  return (
    <div>
      <Product productID={2} />
    </div>
  );
};

export default Home;
