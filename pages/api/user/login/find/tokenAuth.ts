import { NextApiRequest, NextApiResponse } from 'next';
import prismaClient from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const tokenNum = req.body;
  const { user } = req.session;
  if (user) return res.json({ ok: false, error: 'YOU MUST SIGN OUT!' });
  //
  if (!tokenNum)
    return res.json({ ok: false, error: '데이터가 미입력 되었습니다.' });
  //
  const foundToken = await prismaClient.token.findUnique({
    where: { tokenNum: +tokenNum },
    select: { UserID: true },
  });
  if (!foundToken)
    return res.json({ ok: false, error: '토큰번호가 일치하지 않습니다.' });
  //
  const foundUser = await prismaClient.user.findUnique({
    where: { id: foundToken.UserID },
    select: { id: true, userId: true },
  });
  if (!foundUser)
    return res.json({ ok: false, error: 'NO USER FOUND FOR THIS TOKEN..' });
  //
  const foundUserId = foundUser.userId;
  //
  return res.json({ ok: true, foundUserId });
}

export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler, isPrivate: false })
);
