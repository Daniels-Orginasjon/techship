import passport from '../../lib/server/passport';
import auth from '../../middleware/auth';
import nextConnect from 'next-connect';
import {
  NextApiRequestWithSession,
  NextApiResponseWithSession,
} from '../../types/session';



const handler = nextConnect()
  .use(auth)
  .post((req: NextApiRequestWithSession, res: NextApiResponseWithSession) => {
      req.logout()
      res.json("logged out");
    },
);
  


export default handler;