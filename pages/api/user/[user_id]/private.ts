import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user_id } = req.query;
  if (!user_id) return res.json({ ok: false, error: 'query missed' });
  //
  const user = await client.user.findUnique({
    where: { id: +user_id.toString() },
    select: { onPrivate: true },
  });
  if (!user) return res.json({ ok: false, error: 'no user found' });
  return res.json({ ok: true, onPrivate: user.onPrivate });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
