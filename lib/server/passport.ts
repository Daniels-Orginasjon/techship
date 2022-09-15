
import { Prisma } from '@prisma/client';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../../types/user';
import { findUser, validatePassword } from './db';

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser(async (username: string, done) => {
  const user = await findUser({ username });
  done(null, user);
});


passport.use(
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username: string, password: string, done) => {
      const user = await findUser({ username })
      
      if (!user || !(await validatePassword(password, user.password))) {
        return done(null, false)
      } else {
        return done(null, user)
      }
    }
  )
)


export default passport;