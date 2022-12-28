import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { password } = req.body;
  const { user } = req.session;
  const { user_id } = req.query;
  if (!user) return res.json({ ok: false, error: 'must_login' });
  if (!user_id) return res.json({ ok: false, error: 'query_miss' });
  if (!password) return res.json({ ok: false, error: 'input_miss' });

  const target = await client.user.findUnique({
    where: { id: +user_id.toString() },
  });
  if (!target) return res.json({ ok: false, error: 'no_data' });

  const isMatch = Boolean(user?.id === target.id);
  if (!isMatch) return res.json({ ok: false, error: 'invalid_host' });
  //
  const isValid = await bcrypt.compare(password, target.password!);
  if (!isValid) return res.json({ ok: false, error: 'invalid_pw_og' });

  await client.follower.deleteMany({ where: { user_id: target.id } });
  await client.following.deleteMany({ where: { user_id: target.id } });
  await client.user.delete({ where: { id: target.id } });
  req.session.destroy();
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
