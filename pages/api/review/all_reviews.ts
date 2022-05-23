import prismaClient from '../../../src/libs/server/prisma_client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../src/libs/server/withHandler';
import { withApiSession } from '../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //Get all reviews exist
  const allReviews = await prismaClient.review.findMany({
    include: { user: { select: { username: true } } },
    orderBy: {
      id: 'desc',
    },
  });
  if (!allReviews) return res.json({ ok: false, error: 'NO REVIEWS!' });
  //
  return res.json({ ok: true, allReviews });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
