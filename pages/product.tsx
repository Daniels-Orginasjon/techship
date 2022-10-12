import React from 'react';
import ShowProduct from '/usr/src/app/components/product/ShowProduct';
import { useRouter } from 'next/router';

function OneProduct() {
  var router = useRouter();
  var prodId: string | string[] | undefined = router.query['ProductId'];
  return (
    <div className="min-h-full">
      <ShowProduct productID={prodId} />
    </div>
  );
}

export default OneProduct;
