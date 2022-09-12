import { prisma, Prisma } from '@prisma/client';
import { handler } from '../../../middleware/handler';
import { connectDB } from '../../../lib/server/db';
import { NextApiRequest, NextApiResponse } from 'next';
import passport from 'passport';
import LocalStrategy from 'passport-local';


async function createAccount() {
    // const { prisma } = await connectDB();
    // const user = await prisma.user.create({
    //     data: {
    //         username: `${username}`,
    //         password: `${}`,
    //         email: `${email}`,
    //     }
    // })
}