import React, { useCallback, useEffect, useState } from 'react';
import { Prisma } from '@prisma/client';
import { NextPage } from 'next';
import Product from './product';
import { ProductsApiResponse } from '../../pages/api/products';

let URL_KEY = process.env.NEXT_PUBLIC_URL;

const Products: NextPage = () => {
  const [products, setProducts] = useState<
    Prisma.ProductsGetPayload<{ include: { Review: false } }>[]
  >([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [maxPages, setMaxPages] = useState(0);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  const handleNextPage = () => {
    setOffset(offset + limit);
  };

  const handlePrevPage = () => {
    setOffset(offset - limit);
  };

  const getProducts = useCallback(() => {
    let url = new URL(URL_KEY + '/api/products');
    url.searchParams.append('offset', offset.toString());
    url.searchParams.append('limit', limit.toString());

    fetch(url.toString())
      .then((res) => {
        if (res.status !== 200) throw res.json();
        return res.json();
      })
      .then((res: ProductsApiResponse) => {
        setProducts(res.products);
        setCurrentPage(res.pagination.currentPage);
        setMaxPages(res.pagination.pages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [offset, limit]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);
  return (
    <div>
      <div>
        {products &&
          products.map((product) => (
            <div key={product.id} className="mb-5">
              <Product productID={product.id} />
            </div>
          ))}
      </div>
      <div>
        {currentPage > 0 && <button onClick={handlePrevPage}>Tilbake</button>}
        <h1>{currentPage + 1}</h1>
        {currentPage + 1 < maxPages && (
          <button onClick={handleNextPage}>Neste</button>
        )}
      </div>
    </div>
  );
};

export default Products;
