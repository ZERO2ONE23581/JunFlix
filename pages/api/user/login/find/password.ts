import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.body;
  const { user } = req.session;
  if (user) return res.json({ ok: false, error: 'YOU MUST SIGN OUT!' });
  if (!userId) return res.json({ ok: false, error: 'INPUT DATA REQUIRED' });
  const tokenNum = Math.floor(Math.random() * 90000) + 10000; //6 random digits
  //
  const foundUser = await client.user.findUnique({
    where: { userId },
    select: { id: true, userId: true },
  });
  if (!foundUser)
    return res.json({ ok: false, error: '존재하지 않는 아이디 입니다.' });

  //토큰생성
  const token = await client.token.create({
    data: {
      tokenNum,
      user: {
        connect: { id: foundUser.id },
      },
    },
  });
  if (!token) return res.json({ ok: false, error: 'FAIL TO CREATE TOKEN' });

  //이메일로 토큰숫자 전달 (나중에 구현)

  //
  return res.json({ ok: true });
}

export default withApiSession(
  withHandler({ methods: ['POST'], handler, isPrivate: false })
);
