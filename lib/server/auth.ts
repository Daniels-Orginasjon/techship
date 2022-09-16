import bcrypt from "bcrypt"

import { connectDB } from "./db";


function verifyPassword(password:string, hashedPassword:string){
    return bcrypt.compare(password, hashedPassword)
}

async function getPassword(email:string) {
    const {prisma}= await connectDB()
    const user = await prisma.user.findFirst(
        {
            where: {
                email: email
            },
            select:{
                password: true
            }
            
        }
    )
    if (!user) throw "Email is incorrect"
    return user?.password 
}

export {verifyPassword, getPassword}