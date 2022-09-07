import { Prisma } from '@prisma/client';
import React, { useEffect, useState, useCallback } from 'react';

let URL = process.env.NEXT_PUBLIC_URL;

function Product({ productID }: { productID: number }) {
  const [product, setProduct] =
    useState<Prisma.ProductsGetPayload<{ include: { Review: false } }>>();
  const getProduct = useCallback(() => {
    console.log(URL + 'api/products/' + productID);
    fetch(URL + 'api/products/' + productID)
      .then((res) => {
        if (res.status !== 200) throw res.json();
        return res.json();
      })
      .then(
        (
          product: Prisma.ProductsGetPayload<{ include: { Review: false } }>,
        ) => {
          setProduct(product);
        },
      )
      .catch((err) => {
        console.log(err);
      });
  }, [productID]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);
  if (!product) return <div>Loading</div>;
  return (
    <div className="border">
      <div>{product?.title}</div>
      <div>{product?.content}</div>
      <div>{product?.price}</div>
    </div>
  );
}

export default Product;
