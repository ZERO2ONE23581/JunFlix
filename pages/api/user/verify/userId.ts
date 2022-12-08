import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.body;
  if (!userId) return res.json({ ok: false, error: 'input_miss' });
  //
  const found = await client.user.findUnique({
    where: { userId },
    select: { id: true, userId: true },
  });
  if (!found) return res.json({ ok: false, error: 'no_data' });
  //
  const digits = Math.floor(Math.random() * 90000) + 100000;
  const token = await client.token.create({
    data: { digits, host: { connect: { id: found.id } } },
    select: { id: true },
  });
  if (!token) return res.json({ ok: false, error: 'token failed' });
  //
  return res.json({ ok: true });
}
export default withApiSession(
  withHandler({ methods: ['POST'], handler, isPrivate: false })
);
