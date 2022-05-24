import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { review_id } = req.query;
  if (!user) return res.json({ ok: false, error: 'MUST LOGIN!' });
  if (!review_id) return res.json({ ok: false, error: 'QUERY ERROR' });

  const foundReview = await client.review.findUnique({
    where: { id: +review_id },
    include: { user: { select: { username: true } } },
  });
  if (!foundReview) return res.json({ ok: false, error: 'NO REVIEW FOUND!' });
  //
  return res.json({ ok: true, foundReview });
}
export default withApiSession(withHandler({ methods: ['GET'], handler }));
