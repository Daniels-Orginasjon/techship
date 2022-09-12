import React, { useCallback, useEffect, useState } from 'react';
import { Prisma } from '@prisma/client';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

let WEB_URL = process.env.NEXT_PUBLIC_URL;
export interface ProductProps {
  product: Prisma.ProductsGetPayload<{ include: { Review: false } }>;
}
const ExampleProduct = () => {
  return <></>;
};

export default ExampleProduct;
