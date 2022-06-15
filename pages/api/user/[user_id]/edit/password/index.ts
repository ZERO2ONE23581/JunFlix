import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id } = req.query;
  const { currentPassword, newPassword, passwordConfirm } = req.body;
  const mustData = Boolean(currentPassword && newPassword && passwordConfirm);
  //
  if (user?.id !== Number(user_id))
    return res.json({ ok: false, error: 'INVALID USERID QUERY' });
  if (!mustData) return res.json({ ok: false, error: 'INPUT DATA REQUIRED' });
  const currentUser = await client.user.findUnique({
    where: { id: user.id },
  });
  if (!currentUser)
    return res.json({ ok: false, error: '로그인이 필요한 기능입니다.' });

  //PASSWORD CHECK
  if (newPassword !== passwordConfirm)
    return res.json({ ok: false, error: 'PASSWORD CONFIRM FAIL' });

  //PASSWORD CHECK
  const currentPasswordMatch = await bcrypt.compare(
    currentPassword,
    currentUser.password!
  );
  if (!currentPasswordMatch)
    return res.json({ ok: false, error: 'INVALID CURRENT PASSWORD' });

  const isSamePassword = await bcrypt.compare(
    newPassword,
    currentUser.password!
  );
  if (isSamePassword) return res.json({ ok: false, error: 'SAME PASSWORD' });

  //HASH NEW PASSWORD -> UPDATE
  bcrypt.hash(newPassword, 10, async function (err, hasedPassword) {
    if (err) return console.log('HASH PASSWORD FAIL');
    await client.user.update({
      where: { id: currentUser.id },
      data: { password: hasedPassword },
    });
  });
  //
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
