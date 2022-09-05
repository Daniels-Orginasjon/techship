// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../lib/server/db';
import { handler } from '../../../middleware/handler';
import { Prisma } from '@prisma/client';

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
    let id: number = Number(req.query.productID);

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
