
import nextConnect from 'next-connect';
import auth from '../../middleware/auth';
import passport from '../../lib/server/passport';
import {
  NextApiRequestWithSession,
  NextApiResponseWithSession,
} from '../../types/session';
const handler = nextConnect()
  .use(auth)
  .post(
    passport.authenticate('local'),
    (req: NextApiRequestWithSession, res: NextApiResponseWithSession) => {
      res.json({ user: req.user });
    },
  );

export default handler;