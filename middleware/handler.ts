import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';

export type ErrorResponse = {
  error: string;
};
export const errorHandler = {
  onError: (
    err: any,
    req: NextApiRequest,
    res: NextApiResponse<ErrorResponse>,
    next: NextHandler,
  ) => {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  },
  onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
    res.status(404).send('Not found!');
  },
};
