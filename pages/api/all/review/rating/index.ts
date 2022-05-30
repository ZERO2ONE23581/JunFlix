import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const ratings = await client.review.findMany({
    select: {
      id: true,
      score: true,
      oneline: true,
      recommend: true,
      movieTitle: true,
      user: { select: { username: true } },
    },
    orderBy: {
      id: 'desc',
    },
  });
  if (!ratings) return res.json({ ok: false, error: 'NO RATINGS FOUND' });
  return res.json({ ok: true, ratings });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
