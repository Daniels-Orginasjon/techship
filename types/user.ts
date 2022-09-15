import { Prisma } from '@prisma/client';

export interface User extends Prisma.UserGetPayload<{}> {
  _id?: number;
}
