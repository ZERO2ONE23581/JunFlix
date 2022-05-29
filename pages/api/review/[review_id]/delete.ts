import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../src/libs/server/withHandler';
import client from '../../../../src/libs/server/prisma_client';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { review_id } = req.query;
  const { userId, reviewId } = req.body;
  const mustData = Boolean(userId && reviewId);

  //ERR
  if (!user) return res.json({ ok: false, error: 'MUST LOGIN!' });
  if (!review_id) return res.json({ ok: false, error: 'QUERY ERROR' });
  if (!mustData) return res.json({ ok: false, error: 'INPUT DATA REQUIRED!' });
  if (userId !== user.id)
    return res.json({ ok: false, error: 'INVALID USER!' });
  if (reviewId !== +review_id)
    return res.json({ ok: false, error: 'INVALID REVIEW!' });

  //Select Review
  const foundReview = await client.review.findUnique({
    where: { id: reviewId },
    select: { id: true, UserID: true },
  });

  //ERR
  if (!foundReview) return res.json({ ok: false, error: 'NO BOARD FOUND!' });
  const validity = Boolean(
    user.id === foundReview.UserID && +review_id === foundReview.id
  );
  if (!validity) return res.json({ ok: false, error: 'UNAUTHORIZED!' });

  //Delete Review
  await client.review.delete({
    where: { id: foundReview.id },
  });
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
