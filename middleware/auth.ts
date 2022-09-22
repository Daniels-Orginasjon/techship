import nextConnect from 'next-connect';
import passport from '../lib/server/passport';
import session from '../lib/server/session';
// ISSUE: #31 Should check if env variable IRON_SESSION_SECRET is set and throw error if not. @gorknu19 @Mathias231
const auth = nextConnect()
  .use(
    session({
      name: 'sess',
      secret: process.env.IRON_SESSION_SECRET,
      cookie: {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
      },
    }),
  )

  .use(passport.initialize())
  .use(passport.session());

export default auth;
