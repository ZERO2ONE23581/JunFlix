import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const inputs = req.body;
  const { user } = req.session;
  const { user_id } = req.query;
  if (!user) return res.json({ ok: false, error: 'must_login' });
  if (!inputs) return res.json({ ok: false, error: 'miss_input' });
  if (!user_id) return res.json({ ok: false, error: 'miss_query' });

  const target = await client.user.findUnique({
    where: { id: +user_id.toString() },
  });
  if (!target) return res.json({ ok: false, error: 'no_data.' });
  const isMatch = Boolean(user?.id === target.id);
  if (!isMatch) return res.json({ ok: false, error: 'invalid_host' });

  const og_password = inputs.password;
  const new_confirm = inputs.new_confirm;
  const new_password = inputs.new_password;

  const isOgMatch = Boolean(
    await bcrypt.compare(og_password, target.password!)
  );
  if (!isOgMatch) return res.json({ ok: false, error: 'invalid_pw_og' });

  const isNewMatch = Boolean(new_password !== new_confirm);
  if (!isNewMatch) return res.json({ ok: false, error: 'pw_unmatch ' });
  //
  bcrypt.hash(new_password, 10, async function (error, hasedPassword) {
    if (error) return res.json({ ok: false, error: 'pw_hash_fail' });
    const User = await client.user.update({
      where: { id: user.id },
      data: { password: hasedPassword },
      select: { password: true },
    });
    if (!User) return res.json({ ok: false, error: 'update_fail' });
  });
  return res.json({ ok: true, msg: 'updated' });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
