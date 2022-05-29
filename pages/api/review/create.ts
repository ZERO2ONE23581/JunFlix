import client from '../../../src/libs/server/prisma_client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../src/libs/server/withHandler';
import { withApiSession } from '../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const {
    avatar,
    Title,
    movieTitle,
    genre,
    content,
    oneline,
    recommend,
    score,
  } = req.body;
  const mustData = Boolean(Title && movieTitle && genre && content);

  //error handling
  if (!user) return res.json({ ok: false, error: 'MUST LOGIN' });
  if (!mustData) return res.json({ ok: false, error: 'INPUT DATA REQUIRED' });

  //Create review
  await client.review.create({
    data: {
      avatar,
      title: Title,
      movieTitle,
      genre,
      content,
      score: +score,
      oneline,
      recommend,
      UserID: user.id,
    },
  });
  //
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
