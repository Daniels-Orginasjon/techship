import React, { useEffect, useState } from 'react';
import { Prisma } from '@prisma/client';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

let WEB_URL = process.env.NEXT_PUBLIC_URL;
export interface ProductProps {
  product: Prisma.ProductsGetPayload<{ include: { Review: false } }>;
}
const ExampleProduct = ({ product }: ProductProps) => {
  const price =
    Intl.NumberFormat('no-NO', {
      style: 'currency',
      currency: 'NOK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(product.price)
      .replace('kr', '')
      .trim() + ',-';
  let salePrice = null;
  if (product.salePrice !== null) {
    salePrice =
      Intl.NumberFormat('no-NO', {
        style: 'currency',
        currency: 'NOK',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
        .format(product.salePrice)
        .replace('kr', '')
        .trim() + ',-';
  }

  return (
    <div className="group relative border p-5">
      <div className="bg-white grid justify-center">
        <div className="relative w-52">
          <Image
            src={product.image || ''}
            alt={product.title}
            width={600}
            height={600}
            layout="responsive"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="p-2 grid grid-cols-2">
        <div className="flex justify-start">
          <div>
            <h3 className="text-sm text-gray-700">
              <Link href={`/product/${product.id}`}>
                <a className="font-medium text-gray-900 hover:text-gray-700">
                  {product.title}
                </a>
              </Link>
            </h3>
          </div>
        </div>
        <div className="flex justify-end">
          <div>
            <h3 className="text-sm text-gray-700">
              <Link href={`/product/${product.id}`}>
                <a
                  className={
                    'font-medium text-gray-900 hover:text-gray-700' +
                    (product.salePrice !== null ? ' line-through' : '')
                  }
                >
                  {price}
                </a>
              </Link>
            </h3>

            {
              // display sale price if it exists
              salePrice !== null && (
                <span className="text-sm text-gray-700">
                  <Link href={`/product/${product.id}`}>
                    <a className="font-medium text-gray-900 hover:text-gray-700 ">
                      {salePrice}
                    </a>
                  </Link>
                </span>
              )
            }
          </div>
        </div>
      </div>
      <div className="p-2 grid grid-cols-1">
        <div className="flex justify-between">
          <p className="mt-1 text-sm text-gray-500">{product.content || ''}</p>
        </div>
      </div>
    </div>
  );
};

export default ExampleProduct;
