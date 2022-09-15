import { prisma, Prisma } from '@prisma/client';
import { connectDB, createUser, findUser } from '../../../lib/server/db';
import { NextApiRequest, NextApiResponse } from 'next';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import { errorHandler } from '../../../middleware/handler';
import nc from 'next-connect';
import { v4 as uuidv4 } from 'uuid';
const handler = nc(errorHandler);

export interface CreateUserPost extends NextApiRequest {
  body: {
    email: string[] | string | undefined;
    username: string[] | string | undefined;
    createPassword: string[] | string | undefined;
    confirmPassword: string[] | string | undefined;
  };
}
handler.post(async (req: CreateUserPost, res: NextApiResponse) => {});

export default handler;
