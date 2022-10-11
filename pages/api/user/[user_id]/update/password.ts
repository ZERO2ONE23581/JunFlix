import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id } = req.query;
  const { password, newPassword, pw_confirm } = req.body;
  if (!user) return res.json({ ok: false, error: 'must login.' });
  if (user?.id !== +user_id)
    return res.json({ ok: false, error: 'user not matched.' });
  if (!Boolean(password && newPassword && pw_confirm))
    return res.json({ ok: false, error: 'input missed.' });
  if (newPassword !== pw_confirm)
    return res.json({ ok: false, error: 'password not matched. ' });

  const LoggedInUser = await client.user.findUnique({ where: { id: user.id } });
  if (LoggedInUser) {
    const isCorrect = await bcrypt.compare(password, LoggedInUser.password!);
    if (!isCorrect)
      return res.json({
        ok: false,
        error: '현재 비밀번호를 다시 확인해주세요.',
      });

    bcrypt.hash(newPassword, 10, async function (err, hasedPassword) {
      if (err) return console.log('HASH PASSWORD FAIL');
      await client.user.update({
        where: { id: user.id },
        data: { password: hasedPassword },
      });
    });
    return res.json({ ok: true });
  } else return res.json({ ok: false, error: 'must login' });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
