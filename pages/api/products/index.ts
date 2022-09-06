import { Prisma } from '@prisma/client';
import { handler } from '../../../middleware/handler';
import { connectDB } from '../../../lib/server/db';
import { NextApiRequest, NextApiResponse } from 'next';

interface Request extends NextApiRequest {
  query: {};
}

handler.get(
  async (
    req: Request,
    res: NextApiResponse<
      Prisma.ProductsGetPayload<{ include: { Review: false } }>[] | Error
    >,
  ) => {
    // Connection to database
    const { prisma } = await connectDB();

    let products = await prisma.products.findMany({
      take: 10,
    });

    return res.status(200).send(products);
  },
);

export default handler;
