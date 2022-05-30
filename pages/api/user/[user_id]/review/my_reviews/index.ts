import client from '../../../../../../src/libs/server/prisma_client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id } = req.query;
  if (!user) return res.json({ ok: false, error: 'MUST LOGIN!' });
  if (!user_id) return res.json({ ok: false, error: 'QUERY ERROR!' });
  //
  const reviews = await client.review.findMany({
    where: { UserID: user.id },
    include: { user: { select: { username: true } } },
    orderBy: {
      id: 'desc',
    },
  });
  if (reviews.length === 0)
    return res.json({ ok: false, error: 'NO REVIEWS!' });
  //
  return res.json({ ok: true, reviews });
}
export default withApiSession(withHandler({ methods: ['GET'], handler }));
