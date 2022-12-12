import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, password, password_confirm } = req.body;

  const isMatch = Boolean(password === password_confirm);
  const isInputs = Boolean(userId || password || password_confirm);

  if (!isMatch) return res.json({ ok: false, error: 'pw_unmatch' });
  if (!isInputs) return res.json({ ok: false, error: 'miss_input' });

  const found = await client.user.findUnique({ where: { userId } });
  if (!found) return res.json({ ok: false, error: 'no_data' });

  bcrypt.hash(password, 10, async function (error, hashed) {
    if (error) return res.json({ ok: false, error: 'hash_fail' });
    const isUpdated = Boolean(
      await client.user.update({
        where: { id: found.id },
        data: { password: hashed },
        select: { password: true },
      })
    );
    return res.json({ ok: isUpdated });
  });
}
export default withApiSession(
  withHandler({ methods: ['POST'], handler, isPrivate: false })
);
