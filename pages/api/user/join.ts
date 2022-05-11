import { NextApiRequest, NextApiResponse } from 'next';
import prismaClient from '../../../src/libs/server/prisma_client';
import withHandler from '../../../src/libs/server/withHandler';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, userId, password, confirmPassword, email } = req.body;

  //데이터 미입력 체크
  const data = Boolean(
    username && (userId || email) && password && confirmPassword
  );
  if (!data)
    return res.json({ ok: false, error: '데이터가 미입력 되었습니다.' });

  //비밀번호 일치 체크
  if (Boolean(password !== confirmPassword))
    return res.json({ ok: false, error: '비밀번호가 일치하지 않습니다.' });

  //중복체크
  if (userId) {
    const DupData = await prismaClient.user.findUnique({
      where: { userId },
    });
    if (DupData)
      return res.json({ ok: false, error: '이미 가입한 아이디 입니다.' });
  }
  if (email) {
    const DupData = await prismaClient.user.findUnique({
      where: { email },
    });
    if (DupData)
      return res.json({ ok: false, error: '이미 가입한 이메일 입니다.' });
  }

  //유저생성
  await prismaClient.user.create({
    data: {
      username,
      userId,
      password,
      email,
    },
  });
  //
  return res.json({ ok: true });
}
export default withHandler(['POST'], handler);
