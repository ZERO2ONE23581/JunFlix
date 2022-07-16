import client from '../../../../../src/libs/server/prisma_client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  if (!user) return res.json({ ok: false, error: 'login needed.' });
  const reviews = await client.review.findMany({
    orderBy: {
      id: 'desc',
    },
    where: { UserID: user.id },
    include: {
      _count: true,
      user: { select: { username: true, avatar: true, userId: true } },
    },
  });
  if (reviews.length === 0)
    return res.json({ ok: false, error: 'NO REVIEWS!' });
  //
  return res.json({ ok: true, reviews });
}
export default withApiSession(withHandler({ methods: ['GET'], handler }));
