import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { newPassword, foundUserId } = req.body;
  const isInputData = Boolean(newPassword && foundUserId);
  if (user) return res.json({ ok: false, error: 'YOU MUST SIGN OUT!' });
  if (!isInputData)
    return res.json({ ok: false, error: '데이터가 미입력 되었습니다.' });
  //
  const foundUser = await client.user.findUnique({
    where: { id: foundUserId },
    select: { password: true },
  });
  if (!foundUser) return res.json({ ok: false, error: 'NO USER FOUND' });

  //PASSWORD CHECK
  const passwordMatch = await bcrypt.compare(newPassword, foundUser.password!);
  if (passwordMatch) return res.json({ ok: false, error: 'SAME PASSWORD' });

  //HASH NEW PASSWORD -> UPDATE
  bcrypt.hash(newPassword, 10, async function (err, hasedPassword) {
    if (err) return console.log('HASH PASSWORD FAIL');
    await client.user.update({
      where: { id: foundUserId },
      data: { password: hasedPassword },
    });
  });
  //
  return res.json({ ok: true });
}
export default withApiSession(
  withHandler({ methods: ['POST'], handler, isPrivate: false })
);
