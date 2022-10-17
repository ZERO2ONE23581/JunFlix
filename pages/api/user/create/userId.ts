import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.body;
  if (!userId) return res.json({ ok: false, error: 'input missed.' });
  //
  const isExist = Boolean(await client.user.findUnique({ where: { userId } }));
  if (isExist) return res.json({ ok: false, error: 'already in use userId.' });
  //
  return res.json({ ok: true, userId, type: 'userId' });
}
export default withApiSession(
  withHandler({ methods: ['POST'], handler, isPrivate: false })
);