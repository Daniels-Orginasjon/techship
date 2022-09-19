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
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-1 lg:grid-cols-4">
        {products &&
          products.map((product) => (
            <div key={product.id} className="mb-5">
              <Product productID={product.id} />
            </div>
          ))}
      </div>
      <div className="flex -space-x-px justify-center">
        {currentPage > 0 && (
          <button
            onClick={handlePrevPage}
            className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Tilbake
          </button>
        )}
        <h1 className="py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
          {currentPage + 1}
        </h1>
        {currentPage + 1 < maxPages && (
          <button
            onClick={handleNextPage}
            className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Neste
          </button>
        )}
      </div>
    </div>
  );
};

export default Products;
