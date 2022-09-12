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
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState<
    { id: number; quantity: number }[]
  >([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartQuantity, setCartQuantity] = useState(0);
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  useEffect(() => {
    setCartItems(cart);
    setCartTotal(
      cart.reduce((total: number, item: any) => total + item.price, 0),
    );
    setCartQuantity(cart.reduce((total: number, item: any) => total + 1, 0));
    let cartI = cart.map((item: { id: number; quantity: number }) => {});
  }, [cart]);
  let cartI = cart.map((item: { id: number; quantity: number }) => {});
  return <></>;
};

export default ExampleProduct;
