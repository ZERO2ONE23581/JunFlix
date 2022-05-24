import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //Get all reviews -> all ratings
  const allRatings = await client.review.findMany({
    select: {
      score: true,
      oneline: true,
      recommend: true,
      user: { select: { username: true } },
    },
    orderBy: {
      id: 'desc',
    },
  });
  if (!allRatings) return res.json({ ok: false, error: 'NO RATINGS!' });
  //
  return res.json({ ok: true, allRatings });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
