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
  let salePrice: null | string = null;
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
  let discountPercentage: null | string = null;
  if (product.salePrice !== null) {
    if (product.salePrice < product.price) {
      discountPercentage = (
        ((product.price - product.salePrice) / product.price) *
        100
      ).toFixed(0);
    }
  }
  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let item = cart.find((item: any) => item.id === product.id);
    if (item) {
      item.quantity++;
    } else {
      cart.push({ id: product.id, quantity: 1 });
    }
    console.log(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  return (
    <div className="group relative border p-5 hover:bg-gray-100">
      <div className="grid justify-center">
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
                  {discountPercentage !== null && (
                    <div>
                      <span className="text-sm text-red-800">
                        {discountPercentage}%!!! AV
                      </span>
                    </div>
                  )}
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
      <div className="p-2 grid grid-cols-2">
        <div className="flex justify-start">
          <button className="bg-slate-200">VIS</button>
        </div>
        <div className="flex justify-end">
          <button onClick={addToCart} className="bg-slate-200">
            Legg til
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExampleProduct;
