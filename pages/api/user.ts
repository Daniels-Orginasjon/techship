import nextConnect from 'next-connect';
import auth from '../../middleware/auth';
import { createUser } from '../../lib/server/db';
import {
  NextApiRequestWithSession,
  NextApiResponseWithSession,
} from '../../types/session';

interface ApiUserPostRequest extends NextApiRequestWithSession {
  body: {
    username: string | string[] | undefined;
    password: string | string[] | undefined;
    email: string | string[] | undefined;
  };
}

const handler = nextConnect()
  .use(auth)
  .get((req: NextApiRequestWithSession, res: NextApiResponseWithSession) => {
    res.json({ user: req.user });
  })
  .post(async (req: ApiUserPostRequest, res: NextApiResponseWithSession) => {
    console.log(req.body);
    const { username, password, email } =
      req.body as ApiUserPostRequest['body'];
    if (!username || !password || !email) {
      return res.status(400).json({ message: 'Missing fields' });
    }
    if (
      Array.isArray(username) ||
      Array.isArray(password) ||
      Array.isArray(email)
    ) {
      return res.status(400).json({ message: 'Invalid fields' });
    }
    const user = await createUser({ email, username, password });
    if (!user) {
      return res.status(400).json({ message: 'User already exists' });
      
    }
    res.status(200).json({ message: 'New user created' });
  });

export default handler;