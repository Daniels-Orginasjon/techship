import { Prisma } from '@prisma/client';
import { connectDB } from '../../../../lib/server/db';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

export type ErrorResponse = {
  error: string;
};
export type Response = {
  products: Prisma.ProductsGetPayload<{ include: { Review: false } }>[];
  pagination: {
    page: number;
    totalPages: number;
    limit: number;
  };
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
    offset: string | string[] | undefined;
    limit: string | string[] | undefined;

    // Filters
    // name?: string | string[];
    // price?: string | string[];
    // category?: string | string[];
    // brand?: string | string[];
    // rating?: string | string[];
    // numReviews?: string | string[];
    //description?: string | string[];
    //countInStock?: string | string[];
    sale?: string | string[] | undefined;
  };
}

handler.get(
  async (req: Request, res: NextApiResponse<Response | ErrorResponse>) => {
    const { offset, limit } = req.query;
    // checks if offset and limit are numbers

    if (isNaN(Number(offset)) || isNaN(Number(limit))) {
      res.status(400).json({ error: 'Offset and limit must be numbers' });
      return;
    }

    // checks if offset and limit are postive numbers
    const offsetNumber = Number(offset);
    let limitNumber = Number(limit);
    if (limitNumber <= 0) {
      res.status(400).json({ error: 'Limit must be positive and not zero' });
      return;
    }
    if (offsetNumber < 0) {
      res.status(400).json({ error: 'Offset must be positive' });
      return;
    }
    if (limitNumber > 20) {
      res.status(400).json({ error: 'Limit must be less than 20' });
      return;
    }
    const { prisma } = await connectDB();

    const count = await prisma.products.count();
    if (offsetNumber > count - 1) {
      res
        .status(400)
        .json({ error: 'Offset is greater than the number of products' });
      return;
    }

    let newlimitNumber = limitNumber;
    if (offsetNumber + limitNumber > count - 1) {
      newlimitNumber = count - offsetNumber;
    }

    let products = await prisma.products.findMany({
      take: limitNumber,
      skip: offsetNumber,
      include: {
        Review: false,
      },
    });

    const { sale } = req.query;
    if (sale !== undefined) {
      if (sale === 'true') {
        products = products.filter(
          (product) =>
            product.salePrice !== null && product.salePrice < product.price,
        );
      }
    }
    const response: Response = {
      products,
      pagination: {
        page: Math.floor(offsetNumber / limitNumber) + 1,
        totalPages: Math.ceil(count / limitNumber),
        limit: limitNumber,
      },
    };
    return res.status(200).send(response);
  },
);

export default handler;
