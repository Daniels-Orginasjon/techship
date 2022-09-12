import { Prisma } from '@prisma/client';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import ExampleProducts from '../components/example/product/products';
import ExampleProduct from '../components/example/product/product';
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
  return <ExampleProducts></ExampleProducts>;
};

export default Items;
