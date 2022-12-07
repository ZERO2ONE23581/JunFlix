import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;
  if (!email) return res.json({ ok: false, error: 'input missed.' });
  //
  const user = await client.user.findUnique({
    where: { email },
    select: { id: true },
  });
  if (!user) return res.json({ ok: false, error: 'no_email' });
  //
  const digits = Math.floor(Math.random() * 90000) + 100000;
  const token = await client.token.create({
    select: { id: true },
    data: { digits, host: { connect: { id: user.id } } },
  });
  if (!token) return res.json({ ok: false, error: 'token_fail.' });
  //
  return res.json({ ok: true });
}

export default withApiSession(
  withHandler({ methods: ['POST'], handler, isPrivate: false })
);
