import { CookieSerializeOptions, parse, serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';
import { createLoginSession, getLoginSession } from './auth';
import {
  NextApiRequestWithSession,
  NextApiResponseWithSession,
} from '../../types/session';

const parseCookies = (req: NextApiRequest) => {
    if (req.cookies) {
        return req.cookies
    }
    const cookie = req.headers?.cookie
    return parse(cookie || "")
}

export default function session({ name, secret, cookie: cookieOpts }: {
  name: string;
  secret: string;
  cookie: CookieSerializeOptions;
}) {
    return async(
        req: NextApiRequestWithSession,
        res: NextApiResponseWithSession,
        next: NextHandler,
    ) => {
        const cookies = parseCookies(req)
        const token = cookies[name]

        let unsealed = {}

        if (token) {
            try {
                unsealed = await getLoginSession(token,secret)
            } catch (e) {
                console.log(e)
            }
        }

    req.session= unsealed
        const originalEnd = res.end;
        res.end = async function end(...args: any[]) {
            if (res.writableEnded || res.headersSent) return
            if (cookieOpts.maxAge) {
                req.session.maxAge = cookieOpts.maxAge
            }
            const token = await createLoginSession(req.session, secret)
            res.setHeader('Set-Cookie', serialize(name,token,cookieOpts))
            originalEnd.apply(this, args)
        }
        next();
    }
}
