import nextConnect from 'next-connect';
import auth from '../../middleware/auth';
import passport from '../../lib/server/passport';
import {
  NextApiRequestWithSession,
  NextApiResponseWithSession,
} from '../../types/session';
import { Logger } from '../../lib/server/logger';
export const log = new Logger({ prefix: '[pages/api/user]' });
const handler = nextConnect();
handler
  .use(auth)
  .post(
    passport.authenticate('local'),
    (req: NextApiRequestWithSession, res: NextApiResponseWithSession) => {
      res.json({ user: req.user });
    },
  );

export default handler;
