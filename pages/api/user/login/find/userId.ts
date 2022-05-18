import { NextApiRequest, NextApiResponse } from 'next';
import prismaClient from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const email = req.body;
  const { user } = req.session;
  const tokenNum = Math.floor(Math.random() * 90000) + 10000; //6 random digits
  if (user) return res.json({ ok: false, error: 'YOU MUST SIGN OUT!' });
  //
  if (!email)
    return res.json({ ok: false, error: '데이터가 미입력 되었습니다.' });
  //
  const foundUser = await prismaClient.user.findUnique({
    where: { email },
    select: { id: true, email: true },
  });
  if (!foundUser)
    return res.json({ ok: false, error: '등록되지 않은 이메일 입니다.' });

  //토큰생성
  const token = await prismaClient.token.create({
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
  withHandler({ methods: ['GET', 'POST'], handler, isPrivate: false })
);
