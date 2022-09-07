import { Prisma } from '@prisma/client';
import React, { useEffect, useState, useCallback } from 'react';

let URL = process.env.NEXT_PUBLIC_URL;

function Product({ productID }: { productID: number }) {
  const [product, setProduct] =
    useState<Prisma.ProductsGetPayload<{ include: { Review: false } }>>();

  const getProduct = useCallback(() => {
    fetch(URL + '/api/products/' + productID)
      .then((res) => {
        return res.json();
      })
      .then(
        (
          product: Prisma.ProductsGetPayload<{ include: { Review: false } }>,
        ) => {
          setProduct(product);
        },
      );
  }, [productID]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  console.log(product);

  return (
    <div className="border">
      <div>{product?.title}</div>
      <div>{product?.content}</div>
      <div>{product?.price}</div>
    </div>
  );
}

export default Product;
