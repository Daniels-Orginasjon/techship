
import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '@prisma/client';

export interface NextApiRequestWithSession extends NextApiRequest {
  user?: Prisma.UserGetPayload<{}>;
  session: any;
  logout: () => void;
}
export interface NextApiResponseWithSession extends NextApiResponse {
  // cookieEnd is a function that return void
  end: (...args: any[]) => any /* todo: Find the type for this */;
}