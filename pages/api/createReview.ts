
import nextConnect from 'next-connect';
import auth from '../../middleware/auth';
import {
  NextApiRequestWithSession,
  NextApiResponseWithSession,
} from '../../types/session';
import { createReview } from '../../lib/server/db';

interface ApiReviewPostRequest extends NextApiRequestWithSession {
  body: {
    anmeldelseTitle: string | string[] | undefined;
    anmeldelseContent: string | string[] | undefined;
    rating: string | number[] | undefined;
    productId: string | string[] | undefined;
  };
}

const handler =  nextConnect()
.use(auth)
  .post(
    async (req: ApiReviewPostRequest, res: NextApiResponseWithSession) => {
      console.log("cum")
      let data= req.body
      if (!data.anmeldelseTitle || !data.anmeldelseContent || !data.rating || !data.productId) {
      return res.status(400).json({ message: 'Missing fields' });
    }
    if (
      Array.isArray(data.anmeldelseTitle) ||
      Array.isArray(data.anmeldelseContent) ||
      Array.isArray(data.rating) ||
      Array.isArray(data.productId)
    ) {
      return res.status(400).json({ message: 'Invalid fields' });
    }
      const newReview = await createReview({
        anmeldelseTitle:data.anmeldelseTitle,
        anmeldelseContent:data.anmeldelseContent,
        rating: Number(data.rating),
        productId: Number(data.productId)
      })
      res.status(200).json({ message: 'review made' });
      return newReview

    },
  );

export default handler;