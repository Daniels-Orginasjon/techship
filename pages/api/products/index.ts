import { Prisma } from '@prisma/client';
import { connectDB } from '../../../lib/server/db';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

export type ErrorResponse = {
  error: string;
};

export const handler = nextConnect({
  onError: (
    err,
    req: NextApiRequest,
    res: NextApiResponse<ErrorResponse>,
    next,
  ) => {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  },
  onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
    res.status(404).send('Not found!');
  },
});

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
