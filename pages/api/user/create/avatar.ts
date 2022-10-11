import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { avatar, user_id } = req.body;
  const mustInputs = Boolean(avatar && user_id);
  if (!mustInputs) return res.json({ ok: false, error: 'inputs missed.' });
  const user = await client.user.findUnique({
    where: { id: user_id },
  });
  if (!user) return res.json({ ok: false, error: 'no user found.' });
  await client.user.update({
    where: { id: user.id },
    data: { avatar },
  });
  return res.json({ ok: true, type: 'avatar' });
}
export default withApiSession(
  withHandler({ methods: ['POST'], handler, isPrivate: false })
);
