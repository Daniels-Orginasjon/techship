import { Prisma, PrismaClient } from '@prisma/client';
import Image from 'next/image';
import React, { useEffect, useState, useCallback } from 'react';

let URL = process.env.NEXT_PUBLIC_URL;

function Product({ productID }: { productID: number }) {
  const [product, setProduct] =
    useState<Prisma.ProductsGetPayload<{ include: { Review: false } }>>();
  const [price, setPrice] = useState('');
  const getProduct = useCallback(() => {
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
          let enprice = Intl.NumberFormat('no-NO', {
            currency: 'NOK',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(product.price);
          setPrice(enprice + ',-');
        },
      )
      .catch((err) => {
        console.log(err);
      });
  }, [productID]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  function VisProduct() {}

  if (!product) return <div>Loading</div>;
  return (
    <div className="border w-96">
      <a href={'http://localhost:3000/product?ProductId=' + product?.id}>
        <div className="grid grid-cols-3 m-auto">
          <div>
            {product.image && (
              <Image src={product?.image} alt="" width={150} height={200} />
            )}
          </div>
          <div className="col-span-2 m-2">
            <h1 className="font-bold text-xl">{product?.title}</h1>
            <h1 className="font-light">{product?.content}</h1>
            <h1>{price}</h1>
            <button
              className="text-sm font-medium text-white bg-bluemain hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500 rounded-lg px-2 py-1 text-center"
              type="button"
            >
              Vis produktet
            </button>
          </div>
        </div>
      </a>
    </div>
  );
}

export default Product;
