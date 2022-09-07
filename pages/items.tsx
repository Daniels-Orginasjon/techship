import { Prisma } from '@prisma/client';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import ExampleProducts from '../components/example/product/product';
import { Response } from './api/example/products';
let WEB_URL = process.env.NEXT_PUBLIC_URL;
const Items: NextPage = () => {
  const [products, setProducts] = useState<
    Prisma.ProductsGetPayload<{ include: { Review: false } }>[]
  >([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(4);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const getProducts = useCallback(async () => {
    const newPage = new URL(WEB_URL + '/api/example/products');
    newPage.searchParams.append('offset', offset.toString());
    newPage.searchParams.append('limit', limit.toString());

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
  }, [offset, limit]);
  useEffect(() => {
    getProducts();
  }, [getProducts]);

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
  const handlePage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setOffset((page - 1) * limit);
    }
  };
  return (
    <div>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products &&
            products.map((product) => (
              // display product with title and content and price
              <div key={product.id} className="bg-white ">
                <div className="group relative">
                  <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                    <Image
                      src={product.image || ''}
                      alt={product.title}
                      layout="fill"
                      objectFit="contain"
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <Link href={WEB_URL + 'product/' + product.id}>
                          <a href={WEB_URL + 'product/' + product.id}>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {product.title}
                          </a>
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500"></p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {product.price} kr
                    </p>
                  </div>
                </div>
              </div>
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

export default Items;
