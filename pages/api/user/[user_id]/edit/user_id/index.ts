import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userID } = req.body;
  const { user } = req.session;
  const { user_id } = req.query;
  if (!userID)
    return res.json({ ok: false, error: '데이터가 미입력 되었습니다.' });
  if (!user)
    return res.json({ ok: false, error: '로그인이 필요한 기능입니다.' });
  const User = await client.user.findUnique({ where: { id: user.id } });
  if (user.id !== +user_id)
    return res.json({ ok: false, error: '수정권한이 없습니다.' });
  if (User?.userId === userID)
    return res.json({ ok: false, error: '현재 사용중인 아이디 입니다.' });
  const alredayExists = await client.user.findUnique({
    where: { userId: userID },
  });
  if (alredayExists)
    return res.json({ ok: false, error: '이미 사용중인 아이디 입니다.' });
  await client.user.update({
    where: { id: user.id },
    data: { userId: userID },
  });
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
