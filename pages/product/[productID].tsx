import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Prisma } from '@prisma/client';
import Link from 'next/link';
function ProductListing() {
  const router = useRouter();
  const { productID } = router.query;
  const [product, setProduct] =
    useState<Prisma.ProductsGetPayload<{ include: { Review: false } }>>();
  const getProduct = useCallback(async () => {
    const res = await fetch(`/api/products/${productID}`);
    const data = await res.json();
    setProduct(data);
  }, [productID]);
  useEffect(() => {
    getProduct();
  }, [getProduct]);
  if (!product) return <div>Loading...</div>;
  return (
    <div>
      {/* return to previous page */}
      <span onClick={() => router.back()}>Back</span>
      <h1>Product Listing</h1>
      <p>Product ID: {product.title}</p>
    </div>
  );
}

export default ProductListing;
