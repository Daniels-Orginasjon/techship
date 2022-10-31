
import nextConnect from 'next-connect';
import auth from '../../middleware/auth';
import passport from '../../lib/server/passport';
import bcrypt from 'bcrypt';

import {
  NextApiRequestWithSession,
  NextApiResponseWithSession,
} from '../../types/session';
import { deleteUser, updateUser } from '../../lib/server/db';
const handler = nextConnect()
  .use(auth)
  .post(

    (req: NextApiRequestWithSession, res: NextApiResponseWithSession) => {
      if (req.user) {
        

        updateUser(req.user?.uniqueId, req.body),
          res.json({ user: req.user });
          }
      },
  );

export default handler;