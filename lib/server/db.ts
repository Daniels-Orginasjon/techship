import { Prisma, PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

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


export interface CreateUser {
  username: string;
  email: string;
  password: string;
}

/**
 *
 * @param {
 * username: string;
 * email: string;
 * password: string;
 * } user
 * @returns {Promise<Prisma.UserGetPayload<{}> | null>}}}
 */
export const createUser = async ({
  username,
  email,
  password,
}: CreateUser): Promise<Prisma.UserGetPayload<{}> | null> => {
  let pass = await bcrypt.hash(password, 10);
  const user: Prisma.UserCreateInput = {
    uniqueId: uuidv4(),
    username: username,
    email: email,
    password: pass,
  };
  const { prisma } = await connectDB();
  try {
    const newUser = await prisma.user.create({
      data: user,
    });
    console.log(user);
    return newUser;
  } catch (error) {
    console.error(error);
  }
  return null;
};

/**
 * Search for the user using one of the provided fields
 * @param {
 * username?: string;
 * email?: string;
 * password?: string;
 * uniqueId?: string;
 * } user
 * @param includePassword
 * @returns {Promise<Prisma.UserGetPayload<{}> | null>}
 */
export const findUser = async (
  {
    username,
    email,
    password,
    uniqueId,
  }: {
    username?: string;
    email?: string;
    password?: string;
    uniqueId?: string;
  },
  includePassword: boolean = false,
): Promise<Prisma.UserGetPayload<{}>   | null> => {
  const { prisma } = await connectDB();

  if (
    username !== undefined &&
    email !== undefined &&
    uniqueId !== undefined
  ) {
    throw new Error('No search parameters defined');
  }
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email
        },
        {
          username
        },
        {
          uniqueId
        }
      ]
    }
  });

  return user;
};

/**
 * Searches for the user using the uniqueId and updates the user with the new data
 * @param uniqueId
 * @param {
 * username?: string;
 * email?: string;
 * password?: string;
 * } user
 * @returns
 */
export const updateUser = async (
  uniqueId: string,
  {
    username,
    email,
    password,
  }: {
    username?: string;
    email?: string;
      password?: string;
      pass: string;
  },
): Promise<Prisma.UserGetPayload<{}> | null> => {

  const { prisma } = await connectDB();
  if (username == undefined && email == undefined && password == undefined) {
    throw new Error('No search parameters defined');
  }
  try {
    if (password) {
      let pass = await bcrypt.hash(password, 10);
      password = pass
    }

    const user = await prisma.user.update({
      where: {
        uniqueId: uniqueId,
      },
      data: {
        username: username,
        email: email,
        password: password,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
  }
  return null;
};

/**
 * Deletes the user using the uniqueId
 * @param uniqueId
 * @returns {boolean}
 */
export const deleteUser = async (uniqueId: string): Promise<boolean> => {
  const { prisma } = await connectDB();
  try {
    await prisma.user.delete({
      where: {
        uniqueId: uniqueId,
      },
    });
    return true;
  } catch (error) {
    console.error(error);
  }
  return false;
};
/**
 *
 * @param password
 * @param hash
 * @returns {boolean}
 */
export const validatePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  const valid = await bcrypt.compare(password, hash);
  return valid;
};


export { connectDB };
