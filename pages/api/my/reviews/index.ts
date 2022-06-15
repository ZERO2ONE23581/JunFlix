import client from '../../../../src/libs/server/prisma_client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  if (!user)
    return res.json({ ok: false, error: '로그인이 필요한 기능입니다.' });
  //
  const reviews = await client.review.findMany({
    where: { UserID: user.id },
    include: { user: { select: { username: true, avatar: true } } },
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
