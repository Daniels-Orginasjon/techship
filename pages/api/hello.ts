// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../lib/server/db';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { prisma } = await connectDB();
  await prisma.products.create({
    data: {
      title: 'Flower',
      productNr: '321',
      content: 'Beautiful flowers to have in your living room',
      image: '',
    },
  });
  res.status(200).json({ name: 'John Doe' });
}
