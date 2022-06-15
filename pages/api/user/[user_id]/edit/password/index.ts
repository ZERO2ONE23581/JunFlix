import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id } = req.query;
  const { password, newPassword, confirmPassword } = req.body;
  const isInputData = Boolean(password && newPassword && confirmPassword);
  if (!user)
    return res.json({ ok: false, error: '로그인이 필요한 기능입니다.' });
  if (user?.id !== +user_id)
    return res.json({ ok: false, error: '수정권한이 없습니다.' });
  if (!isInputData)
    return res.json({ ok: false, error: '데이터가 미입력 되었습니다.' });
  if (newPassword !== confirmPassword)
    return res.json({ ok: false, error: '비밀번호가 일치하지 않습니다. ' });
  const User = await client.user.findUnique({ where: { id: user.id } });
  const isCorrect = await bcrypt.compare(password, User?.password!);
  if (!isCorrect)
    return res.json({ ok: false, error: '현재 비밀번호를 다시 확인해주세요.' });
  bcrypt.hash(newPassword, 10, async function (err, hasedPassword) {
    if (err) return console.log('HASH PASSWORD FAIL');
    await client.user.update({
      where: { id: user.id },
      data: { password: hasedPassword },
    });
  });
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
