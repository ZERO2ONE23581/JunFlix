import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const inputs = req.body;
  const { user } = req.session;
  const { user_id } = req.query;
  const isMatchQuery = Boolean(user?.id !== +user_id);
  if (!user) return res.json({ ok: false, error: 'must login.' });
  if (!user_id) return res.json({ ok: false, error: 'query missed.' });
  if (!inputs) return res.json({ ok: false, error: 'input missed.' });
  if (!isMatchQuery) return res.json({ ok: false, error: 'invalid query.' });

  const og_password = inputs.password;
  const new_confirm = inputs.new_confirm;
  const new_password = inputs.new_password;

  const User = await client.user.findUnique({
    where: { id: user.id },
    select: { password: true },
  });
  if (!User) return res.json({ ok: false, error: 'no user found. ' });

  const isOgMatch = Boolean(await bcrypt.compare(og_password, User.password!));
  if (!isOgMatch) return res.json({ ok: false, error: 'invalid og password.' });

  const isNewMatch = Boolean(new_password !== new_confirm);
  if (!isNewMatch)
    return res.json({ ok: false, error: 'new password not matched. ' });
  //
  bcrypt.hash(new_password, 10, async function (error, hasedPassword) {
    if (error) return res.json({ ok: false, error: 'password hash failed.' });
    const User = await client.user.update({
      where: { id: user.id },
      data: { password: hasedPassword },
      select: { password: true },
    });
    if (!User) return res.json({ ok: false, error: 'password update failed.' });
  });
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
