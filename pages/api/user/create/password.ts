import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { password, userId } = req.body;
  const isInput = Boolean(password && userId);
  if (!isInput) return res.json({ ok: false, error: 'inputs missed.' });
  //
  const user = await client.user.findUnique({
    where: { userId },
  });
  if (!user) return res.json({ ok: false, error: 'no user found.' });

  //override
  bcrypt.hash(password, 10, async function (error, hasedPassword) {
    if (error) return res.json({ error: 'HASH PASSWORD FAIL' });
    await client.user.update({
      where: { id: user.id },
      data: { password: hasedPassword },
    });
  });
  return res.json({ ok: true });
}
export default withApiSession(
  withHandler({ methods: ['POST'], handler, isPrivate: false })
);
