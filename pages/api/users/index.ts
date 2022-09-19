import { prisma, Prisma } from '@prisma/client';
import { connectDB } from '../../../lib/server/db';
import { NextApiRequest, NextApiResponse } from 'next';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import { errorHandler } from '../../../middleware/handler';
import nc from 'next-connect';
import { getPassword, verifyPassword } from '../../../lib/server/auth';
const handler = nc(errorHandler);








export interface CreateUserPost extends NextApiRequest {
    body: {
        email: string[] | string | undefined,
        username: string[] | string | undefined,
        createPassword: string[] | string | undefined,
        confirmPassword: string[] | string | undefined
},
}

handler.put(async (req: CreateUserPost, res: NextApiResponse) => {
    if (typeof req.body.email !== "string") {
    return res.status(400).send({error:"Email is not a string"})
    }
    if (typeof req.body.createPassword !== "string") {
        return res.status(400).send({error:"createPassword is not a string"})
    }
    if (typeof req.body.confirmPassword !== "string") {
        return res.status(400).send({error:"confirmPassword is not a string"})
    }
    if (typeof req.body.username !== "string") {
        return res.status(400).send({error:"confirmPassword is not a string"})
    }
    if (req.body.createPassword !== req.body.confirmPassword) {
        return res.status(400).send({error:"Passwords dont match"})
    }

    let hashedPassword
    try {
        hashedPassword = await bcrypt.hash(req.body.createPassword, 10)
        console.log(hashedPassword)
    } catch {
        console.log("error")
    }
    const { prisma } = await connectDB();
    const dupeAccount= await prisma.user.findFirst({
        where: {
            username: req.body.username
        }
    })
    console.log(dupeAccount)
    if (dupeAccount !== null) {
        return res.status(400).send({ error: "account dupe" })
    }
    
    try{
    const user = await prisma.user.create({
        data: {
            email: `${req.body.email}`,
            username: `${req.body.username}`,
            password: `${hashedPassword}`,
        }
    })
    } catch {
        return res.status(400).send({error:"server error"})
}
    return res.status(200).send("ACCOUNT CREATED!!!!")
})


export interface LoginUser extends NextApiRequest {
    body: {
        email: string[] | string | undefined,
        password: string[] | string | undefined
},
}


handler.post(async (req: LoginUser, res: NextApiResponse) => {
 if (typeof req.body.email !== "string") {
    return res.status(400).send({error:"Email is not a string"})
    }
    if (typeof req.body.password !== "string") {
        return res.status(400).send({error:"createPassword is not a string"})
    }

    let hashedPassword= await getPassword(req.body.email)
    let verifiedLogin = await verifyPassword(req.body.password, hashedPassword)
    
    return res.status(200).send(verifiedLogin)
 })

export default handler