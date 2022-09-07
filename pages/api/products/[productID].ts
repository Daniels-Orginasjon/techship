import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../lib/server/db';
import { Prisma } from '@prisma/client';
import nc from 'next-connect';
import { errorHandler } from '../../../middleware/handler';
const handler = nc(errorHandler);

type GetData = {
  name: string;
};

type Error = {
  error: string;
};

interface Request extends NextApiRequest {
  query: {
    productID: string;
  };
}

handler.get(
  async (
    req: Request,
    res: NextApiResponse<
      Prisma.ProductsGetPayload<{ include: { Review: false } }> | Error
    >,
  ) => {
    // Connection to database
    const { prisma } = await connectDB();
    if (req.query.productID === undefined)
      return res.status(500).json({ error: 'productID is not valid' });
    let id: number = Number(req.query.productID);

    if (id === NaN) {
      return res.status(500).json({ error: 'productID is not valid' });
    }
    // Gets product where ID from database
    let product = await prisma.products.findFirst({
      where: { id },
    });

    if (product === null) {
      return res.status(404).send({ error: 'Product not found!' });
    }

    return res.status(200).send(product);
  },
);

export default handler;
