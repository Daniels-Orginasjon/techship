import { Prisma } from '@prisma/client';
import { connectDB } from '../../../../lib/server/db';
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
  query: {
    offset: string | string[];
    limit: string | string[];
  };
}

handler.get(
  async (
    req: Request,
    res: NextApiResponse<
      | Prisma.ProductsGetPayload<{ include: { Review: false } }>[]
      | ErrorResponse
    >,
  ) => {
    const { offset, limit } = req.query;
    // checks if offset and limit are numbers
    if (isNaN(Number(offset)) || isNaN(Number(limit))) {
      res.status(400).json({ error: 'Offset and limit must be numbers' });
      return;
    }

    // checks if offset and limit are postive numbers
    const offsetNumber = Number(offset);
    let limitNumber = Number(limit);
    if (offsetNumber <= 0 || limitNumber <= 0) {
      res
        .status(400)
        .json({ error: 'Offset and limit must be positive and not zero' });
      return;
    }
    // limit must be less than 20 to prevent overloading the server
    if (limitNumber > 20) {
      res.status(400).json({ error: 'Limit must be less than 20' });
      return;
    }
    const { prisma } = await connectDB();
    // check if offset is greater than the number of products in the database
    const count = await prisma.products.count();
    if (offsetNumber > count) {
      res
        .status(400)
        .json({ error: 'Offset is greater than the number of products' });
      return;
    }
    // if offset + limit is greater than the number of products in the database
    // then limit is set to the number of products in the database - offset
    if (offsetNumber + limitNumber > count) {
      console.log(count - offsetNumber);
      limitNumber = count - offsetNumber;
    }

    let products = await prisma.products.findMany({
      take: limitNumber,
      skip: offsetNumber,
      include: {
        Review: false,
      },
    });
    return res.status(200).send(products);
  },
);

export default handler;
