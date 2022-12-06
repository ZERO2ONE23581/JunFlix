import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { password } = req.body;
  const { user } = req.session;
  const { user_id } = req.query;
  if (!user) return res.json({ ok: false, error: 'must login.' });
  if (!password) return res.json({ ok: false, error: 'input missed.' });
  if (!user_id) return res.json({ ok: false, error: 'query missed.' });

  const target = await client.user.findUnique({
    where: { id: +user_id.toString() },
  });
  if (!target) return res.json({ ok: false, error: 'no user found.' });
  const isMatch = Boolean(user?.id === target.id);
  if (!isMatch) return res.json({ ok: false, error: 'incorrect_user' });
  //
  const isValid = await bcrypt.compare(password, target.password!);
  if (!isValid) return res.json({ ok: false, error: 'icorrect_password' });

  await client.user.delete({ where: { id: target.id } });
  req.session.destroy();
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
