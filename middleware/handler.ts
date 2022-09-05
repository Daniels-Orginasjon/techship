import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

export type ErrorResponse = {
  error: string;
};

export const handler = nextConnect({
  onError: (
    err,
    req: NextApiRequest,
    res: NextApiResponse<ErrorResponse>,
    next,
  ) => {
    console.log('err');
    res.status(500).json({ error: 'Server error' });
  },
  onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
    res.status(404).send('Not found!');
  },
});
