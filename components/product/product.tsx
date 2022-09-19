import { Prisma, PrismaClient } from "@prisma/client";
import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";

let URL = process.env.NEXT_PUBLIC_URL;

function Product({ productID }: { productID: number }) {
  const [product, setProduct] =
    useState<Prisma.ProductsGetPayload<{ include: { Review: false } }>>();
  const [price, setPrice] = useState("");
  const getProduct = useCallback(() => {
    fetch(URL + "api/products/" + productID)
      .then((res) => {
        if (res.status !== 200) throw res.json();
        return res.json();
      })
      .then(
        (
          product: Prisma.ProductsGetPayload<{ include: { Review: false } }>,
        ) => {
          setProduct(product);
          let enprice = Intl.NumberFormat("no-NO", {
            currency: "NOK",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(product.price);
          setPrice(enprice + ",-");
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
    <div className="border w-96">
      <div className="grid grid-cols-3">
        <div>
          {product.image && (
            <Image src={product?.image} alt="" width={150} height={200} />
          )}
        </div>
        <div className="col-span-2">
          <h1 className="font-bold text-xl">{product?.title}</h1>
          <h1 className="font-light">{product?.content}</h1>
          <h1>{price}</h1>
        </div>
      </div>
    </div>
  );
}

export default Product;
