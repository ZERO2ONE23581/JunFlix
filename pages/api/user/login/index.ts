import { NextApiRequest, NextApiResponse } from 'next';
import prismaClient from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, password } = req.body;
  //
  if (!Boolean(userId && password))
    return res.json({ ok: false, error: '데이터가 미입력 되었습니다.' });

  //일치하는 유저찾기
  const foundUser = await prismaClient.user.findUnique({
    where: { userId },
  });
  if (!foundUser)
    return res.json({ ok: false, error: '아이디가 일치하지 않습니다.' });

  if (foundUser?.password !== password)
    return res.json({ ok: false, error: '비밀번호가 일치하지 않습니다.' });

  //
  return res.json({ ok: true });
}
export default withHandler(['POST'], handler);
