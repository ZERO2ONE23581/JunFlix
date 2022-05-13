import { NextApiRequest, NextApiResponse } from 'next';
import prismaClient from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, userId, password, confirmPw, email } = req.body;
  //
  const data = Boolean(username && (userId || email) && password && confirmPw);
  if (!data)
    return res.json({ ok: false, error: '데이터가 미입력 되었습니다.' });

  //비밀번호 일치 체크
  if (Boolean(password !== confirmPw))
    return res.json({ ok: false, error: '비밀번호가 일치하지 않습니다.' });

  //중복체크
  if (userId) {
    const dupData = await prismaClient.user.findUnique({
      where: { userId },
    });
    if (dupData)
      return res.json({ ok: false, error: '이미 등록된 아이디 입니다.' });
  }
  if (email) {
    const dupData = await prismaClient.user.findUnique({
      where: { email },
    });
    if (dupData)
      return res.json({ ok: false, error: '이미 등록된 이메일 입니다.' });
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
export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler, isPrivate: false })
);
