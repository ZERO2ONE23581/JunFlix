import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user_id } = req.query;
  const reviews = await client.review.findMany({
    orderBy: {
      id: 'desc',
    },
    where: { UserID: +user_id },
    include: {
      _count: true,
      user: { select: { username: true, avatar: true, userId: true } },
    },
  });
  if (reviews.length === 0) return res.json({ ok: false, error: 'No reviews' });
  return res.json({ ok: true, reviews });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
