import React, { useCallback, useEffect, useState } from 'react';
import { Prisma } from '@prisma/client';
import { NextPage } from 'next';
import Product from './product';
import { Response } from '../../../pages/api/example/products';
import ExampleProduct from './product';

let WEB_URL = process.env.NEXT_PUBLIC_URL;
export interface ExampleProductsProps {
  category?: string;
  sale?: boolean;
}

const ExampleProducts = ({ category = '', sale }: ExampleProductsProps) => {
  const [products, setProducts] = useState<
    Prisma.ProductsGetPayload<{ include: { Review: false } }>[]
  >([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(8);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  // handle pagination
  const handleNext = () => {
    setOffset(offset + limit);
  };
  const handlePrevious = () => {
    setOffset(offset - limit);
  };
  const handleFirst = () => {
    setOffset(0);
  };
  const handleLast = () => {
    setOffset((totalPages - 1) * limit);
  };

  const getProducts = useCallback(async () => {
    const newPage = new URL(WEB_URL + '/api/example/products');
    newPage.searchParams.append('offset', offset.toString());
    newPage.searchParams.append('limit', limit.toString());
    if (category) {
      newPage.searchParams.append('category', category);
    }
    if (sale) {
      newPage.searchParams.append('sale', sale.toString());
    }
    fetch(newPage.toString())
      .then((res) => {
        if (res.status !== 200) throw res.json();
        return res.json();
      })
      .then((products: Response) => {
        setProducts(products.products);
        setTotalPages(products.pagination.totalPages);
        setPage(products.pagination.page);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [offset, limit, category, sale]);
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products &&
            products.map((product, i) => (
              // display product with title and content and price
              <ExampleProduct key={product.id} product={product} />
            ))}
          <div></div>
        </div>
        <div className="bg-white ">
          <div className="flex flex-1 justify-between sm:hidden">
            !!
            <a
              href="#"
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous!!!
            </a>
            <a
              href="#"
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExampleProducts;
