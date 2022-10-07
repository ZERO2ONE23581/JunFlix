import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { password, userId } = req.body;
  const isInputData = Boolean(password && userId);
  if (user) return res.json({ ok: false, error: '로그아웃이 필요합니다.' });
  if (!isInputData)
    return res.json({ ok: false, error: '데이터가 미입력 되었습니다.' });

  const foundUser = await client.user.findUnique({
    where: { userId },
  });
  if (!foundUser)
    return res.json({ ok: false, error: '유저가 존재하지 않습니다.' });

  bcrypt.hash(password, 10, async function (error, hasedPassword) {
    if (error) return res.json({ error: 'HASH PASSWORD FAIL' });
    await client.user.update({
      where: { id: foundUser.id },
      data: { password: hasedPassword },
    });
  });
  return res.json({ ok: true });
}
export default withApiSession(
  withHandler({ methods: ['POST'], handler, isPrivate: false })
);
