import client from '../../../../../src/libs/server/prisma_client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const reviews = await client.review.findMany({
    orderBy: {
      id: 'desc',
    },
    include: {
      _count: true,
      user: { select: { username: true, avatar: true, userId: true } },
    },
  });
  if (!reviews) return res.json({ ok: false, error: 'NO REIVEWS FOUND' });
  //
  return res.json({ ok: true, reviews });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
