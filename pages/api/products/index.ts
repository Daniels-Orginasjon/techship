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
  query: {
    offset?: string | string[] | undefined;
    limit?: string | string[] | undefined;
    sale?: string | string[] | undefined;
  };
}

export interface ProductsApiResponse {
  products: Prisma.ProductsGetPayload<{ include: { Review: false } }>[];
  pagination: {
    currentPage: number;
    pages: number;
  };
}

handler.get(
  async (req: Request, res: NextApiResponse<ProductsApiResponse | Error>) => {
    // Connection to database
    const { prisma } = await connectDB();
    let offset = 0;
    let limit = 10;
    if (typeof req.query.offset === 'string') {
      offset = Number(req.query.offset);
      if (offset < 0) throw 'Offset cannot be lower than 0';
      if (offset === NaN) throw 'Offset is not a number';
    }

    if (typeof req.query.limit === 'string') {
      limit = Number(req.query.limit);
      if (limit < 1) throw 'Limit cannot be lower than 0';
      if (limit > 50) throw 'Limit cannot higher than 50';
      if (limit === NaN) throw 'Limit is not a number';
    }

    let products = await prisma.products.findMany({
      take: limit,
      skip: offset,
    });

    const productCount = await prisma.products.count();
    let pages = Math.ceil(productCount / limit);
    let currentPage = Math.floor(offset / limit);

    let productRes: ProductsApiResponse = {
      products,
      pagination: {
        pages,
        currentPage,
      },
    };

    return res.status(200).send(productRes);
  },
);

export default handler;
