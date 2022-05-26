import client from '../../../src/libs/server/prisma_client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../src/libs/server/withHandler';
import { withApiSession } from '../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //Get all reviews exist
  const { user } = req.session;
  if (!user) return res.json({ ok: false, error: 'MUST LOGIN' });
  const allMyReviews = await client.review.findMany({
    where: { UserID: user.id },
    include: { user: { select: { username: true } } },
    orderBy: {
      id: 'desc',
    },
  });
  if (!allMyReviews) return res.json({ ok: false, error: 'NO REVIEWS!' });
  //
  return res.json({ ok: true, allMyReviews });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
