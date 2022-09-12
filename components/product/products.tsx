import React, { useEffect, useState } from 'react';
import { Prisma } from '@prisma/client';
import { NextPage } from 'next';
import Product from './product';

let URL = process.env.NEXT_PUBLIC_URL;

const Products: NextPage = () => {
  const [products, setProducts] = useState<
    Prisma.ProductsGetPayload<{ include: { Review: false } }>[]
  >([]);

  const getProducts = () => {
    fetch(URL + '/api/products')
      .then((res) => {
        if (res.status !== 200) throw res.json();
        return res.json();
      })
      .then(
        (
          products: Prisma.ProductsGetPayload<{ include: { Review: false } }>[],
        ) => {
          setProducts(products);
        },
      )
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div>
      {products &&
        products.map((product) => (
          <div key={product.id} className="mb-5">
            <Product productID={product.id} />
          </div>
        ))}
    </div>
  );
};

export default Products;
