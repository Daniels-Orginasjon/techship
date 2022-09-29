
import nextConnect from 'next-connect';
import auth from '../../middleware/auth';
import passport from '../../lib/server/passport';
import {
  NextApiRequestWithSession,
  NextApiResponseWithSession,
} from '../../types/session';
import { deleteUser } from '../../lib/server/db';
const handler = nextConnect()
  .use(auth)
  .post(
    (req: NextApiRequestWithSession, res: NextApiResponseWithSession) => {
      deleteUser(req.user?.uniqueId),
      res.json({ user: req.user });
    },
  );

export default handler;