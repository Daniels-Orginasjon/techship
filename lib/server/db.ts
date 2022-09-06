import { PrismaClient } from '@prisma/client';

let cachedConnection: undefined | PrismaClient;

let connectDB = async (): Promise<{
  prisma: PrismaClient;
}> => {
  if (cachedConnection) {
    return {
      prisma: cachedConnection,
    };
  }
  const prisma = new PrismaClient();
  await prisma.$connect();
  cachedConnection = prisma;
  return { prisma: prisma };
};

export { connectDB };
