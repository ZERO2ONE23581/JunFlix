import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { avatar, user_id } = req.body;
  const isInputs = Boolean(avatar && user_id);
  if (!isInputs) return res.json({ ok: false, error: 'inputs missed.' });

  const isUser = Boolean(
    await client.user.findUnique({
      where: { id: user_id },
    })
  );
  if (!isUser) return res.json({ ok: false, error: 'no user found.' });
  //
  await client.user.update({
    where: { id: user_id },
    data: { avatar },
  });
  return res.json({ ok: true, type: 'avatar' });
}
export default withApiSession(
  withHandler({ methods: ['POST'], handler, isPrivate: false })
);
