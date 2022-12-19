import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;
  const { user } = req.session;
  const { user_id } = req.query;
  const userId = email.slice(0, email.indexOf('@'));
  if (!user) return res.json({ ok: false, error: 'must login.' });
  if (!email) return res.json({ ok: false, error: 'miss_input' });
  if (!user_id) return res.json({ ok: false, error: 'query missed.' });

  const target = await client.user.findUnique({
    where: { id: +user_id.toString() },
  });
  if (!target) return res.json({ ok: false, error: 'no user found.' });
  const isMatch = Boolean(user?.id === target.id);
  if (!isMatch) return res.json({ ok: false, error: 'user no matched.' });

  const otherUser = await client.user.findUnique({
    where: { email },
    select: { id: true },
  });
  const ExistsAlready = Boolean(otherUser && otherUser.id !== target.id);
  if (ExistsAlready) return res.json({ ok: false, error: 'email_exists' });

  const isUpdated = Boolean(
    await client.user.update({
      where: { id: target.id },
      data: { email, userId },
    })
  );
  return res.json({ ok: isUpdated, msg: 'updated' });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
