import { faker } from '@faker-js/faker';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../lib/server/db';
import { errorHandler } from '../../../middleware/handler';
import nc from 'next-connect';
const handler = nc(errorHandler);
// function to fuck

handler.get(async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { prisma } = await connectDB();
  for (let i in [...Array(1000)])
    try {
      let resp = await prisma.products.create({
        data: {
          title: `${faker.vehicle.manufacturer()} ${faker.vehicle.model()}`,
          price: faker.datatype.number({ min: 100, max: 5000000 }),
          productNr: faker.random.words(5),
          content: `${faker.lorem.paragraph()}`,
          image: faker.image.imageUrl(),
        },
      });
    } catch (err) {
      console.error(err);
    }
});

export default handler;
