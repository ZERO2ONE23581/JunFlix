import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id, review_id } = req.query;
  const isQuery = Boolean(user_id && review_id);
  const { avatar } = req.body;
  if (!user) return res.json({ ok: false, error: 'Need to login.' });
  if (!isQuery) return res.json({ ok: false, error: 'invalid url.' });
  if (user.id !== +user_id)
    return res.json({ ok: false, error: 'invalid user. no rights to edit.' });
  await client.review.update({
    where: { id: +review_id },
    data: {
      avatar,
    },
  });
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
