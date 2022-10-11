import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const email = req.body;
  const { user } = req.session;
  if (user) return res.json({ ok: false, error: '로그아웃이 필요합니다.' });
  if (!email)
    return res.json({ ok: false, error: '데이터가 미입력 되었습니다.' });
  const foundUser = await client.user.findUnique({
    where: { email },
    select: { id: true, email: true },
  });
  if (!foundUser)
    return res.json({ ok: false, error: '등록되지 않은 이메일 입니다.' });
  const tokenNum = Math.floor(Math.random() * 90000) + 100000;
  const token = await client.token.create({
    data: {
      tokenNum,
      user: {
        connect: { id: foundUser.id },
      },
    },
  });
  if (!token) return res.json({ ok: false, error: '토큰생성 실패' });
  return res.json({ ok: true });
}

export default withApiSession(
  withHandler({ methods: ['POST'], handler, isPrivate: false })
);
