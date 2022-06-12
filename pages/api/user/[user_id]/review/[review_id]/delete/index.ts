import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../../../../src/libs/server/withHandler';
import client from '../../../../../../../src/libs/server/prisma_client';
import { withApiSession } from '../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id, review_id } = req.query;
  const isQuery = Boolean(user_id && review_id);
  if (!user) return res.json({ ok: false, error: 'MUST LOGIN!' });
  if (!isQuery) return res.json({ ok: false, error: 'QUERY ERROR' });
  if (+user_id !== user.id)
    return res.json({ ok: false, error: 'INVALID USER!' });
  //
  const review = await client.review.findUnique({
    where: { id: +review_id },
    select: { id: true, UserID: true },
  });
  if (!review) return res.json({ ok: false, error: 'NO BOARD FOUND!' });
  const validity = Boolean(
    user.id === review.UserID && +review_id === review.id
  );
  if (!validity) return res.json({ ok: false, error: 'UNAUTHORIZED!' });
  //
  await client.review.delete({
    where: { id: review.id },
  });
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
