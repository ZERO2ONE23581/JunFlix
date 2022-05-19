import { NextApiRequest, NextApiResponse } from 'next';
import prismaClient from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const tokenNum = req.body;
  const noInput = Boolean(!tokenNum);
  //
  if (user) return res.json({ ok: false, error: 'YOU MUST SIGN OUT!' });
  if (noInput) return res.json({ ok: false, error: 'NO INPUT DATA' });

  //토큰인증
  const foundToken = await prismaClient.token.findUnique({
    where: { tokenNum: +tokenNum },
    select: { UserID: true },
  });
  if (!foundToken)
    return res.json({ ok: false, error: '토큰번호가 일치하지 않습니다.' });
  //
  const foundUser = await prismaClient.user.findUnique({
    where: { id: foundToken.UserID },
    select: { id: true, userId: true, password: true },
  });
  if (!foundUser)
    return res.json({ ok: false, error: 'NO USER FOUND FOR THIS TOKEN..' });

  //찾은 유저의 아이디와 일치하는 토큰삭제
  await prismaClient.token.deleteMany({
    where: { UserID: foundToken.UserID },
  });

  //유저정보 전달
  return res.json({ ok: true, foundUser });
}

export default withApiSession(
  withHandler({ methods: ['POST'], handler, isPrivate: false })
);
