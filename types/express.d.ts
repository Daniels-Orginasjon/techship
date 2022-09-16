import { Prisma } from '@prisma/client';

export declare global {
  namespace Express {
    interface User extends Prisma.UserGetPayload<{}> {}
  }
}