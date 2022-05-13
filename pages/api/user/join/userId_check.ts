import { NextApiRequest, NextApiResponse } from 'next';
import prismaClient from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.body;
  //데이터 미입력 체크
  if (!userId)
    return res.json({ ok: false, error: '데이터가 미입력 되었습니다.' });

  //중복체크
  const dupData = await prismaClient.user.findUnique({
    where: { userId },
  });
  if (dupData)
    return res.json({ ok: false, error: '이미 가입한 아이디 입니다.', userId });
  //
  return res.json({ ok: true, userId });
}
export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler, isPrivate: false })
);
