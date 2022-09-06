import React, { useEffect, useState } from 'react'
import { Prisma } from '@prisma/client';
import { NextPage } from 'next';

let URL = process.env.NEXT_PUBLIC_URL;
  
const Products: NextPage = () => {
  const [products, setProducts] = useState<Prisma.ProductsGetPayload<{ include: { Review: false } }>[]>([]);

  const getProducts = () => {
    fetch(URL + "/api/products")
    .then((res) => {
      return res.json()  
    })
    .then((products: Prisma.ProductsGetPayload<{ include: { Review: false } }>[]) => {
      setProducts(products);
    })
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div>
      {products.map((product) => (
          <div key={product.id}>
            {product.title}
          </div>)
      )}
    </div>
  )
}

export default Products