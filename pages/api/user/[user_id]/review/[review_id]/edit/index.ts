import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { review_id } = req.query;
  const {
    avatar,
    Title,
    movieTitle,
    genre,
    content,
    score,
    oneline,
    recommend,
  } = req.body;
  const mustData = Boolean(Title && movieTitle && genre);

  //ERR
  if (!user) return res.json({ ok: false, error: 'MUST LOGIN!' });
  if (!review_id) return res.json({ ok: false, error: 'QUERY ERROR' });
  if (!mustData) return res.json({ ok: false, error: 'INPUT DATA REQUIRED' });

  //Update review
  const updatedReview = await client.review.update({
    where: { id: +review_id },
    data: {
      avatar,
      title: Title,
      movieTitle,
      genre,
      content,
      score: +score,
      oneline,
      recommend,
    },
  });

  //ERR
  if (!updatedReview)
    return res.json({ ok: false, error: 'REVIEW UPDATE FAILED!' });
  if (updatedReview.UserID !== user.id)
    return res.json({ ok: false, error: 'INVALID USER!' });

  //RETURN
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
