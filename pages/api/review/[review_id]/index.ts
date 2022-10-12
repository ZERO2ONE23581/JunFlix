import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { review_id } = req.query;
  if (!user) return res.json({ ok: false, error: 'must login.' });
  if (!review_id) return res.json({ ok: false, error: 'query missed.' });

  const review = await client.review.findUnique({
    where: { id: +review_id },
    include: { host: true, likes: true, comments: true },
  });
  if (!review) return res.json({ ok: false, error: 'no review found.' });
  //
  return res.json({ ok: true, review });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
