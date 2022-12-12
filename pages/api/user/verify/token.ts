import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { digits } = req.body;
  if (!digits) return res.json({ ok: false, error: 'input_miss' });
  //
  const token = await client.token.findUnique({
    where: { digits },
    select: { host_id: true },
  });
  if (!token) return res.json({ ok: false, error: 'invalid_token' });
  //
  const user = await client.user.findUnique({
    where: { id: token.host_id },
    select: { userId: true },
  });
  if (!user) return res.json({ ok: false, error: 'no_data' });
  //

  await client.token.deleteMany({ where: { host_id: token.host_id } });
  return res.json({ ok: true, found: user.userId });
}
export default withApiSession(
  withHandler({ methods: ['POST'], handler, isPrivate: false })
);
