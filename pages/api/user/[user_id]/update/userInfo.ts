import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id } = req.query;
  const { username, email, name, birth, gender, location } = req.body;
  if (!user)
    return res.json({ ok: false, error: '로그인이 필요한 기능입니다.' });
  const User = await client.user.findUnique({ where: { id: user.id } });
  if (user.id !== +user_id)
    return res.json({ ok: false, error: '수정권한이 없습니다.' });
  if (email && email !== User?.email) {
    const alredayExists = await client.user.findUnique({
      where: { email },
    });
    if (alredayExists)
      return res.json({ ok: false, error: '이미 존재하는 이메일 입니다.' });
  }
  await client.user.update({
    where: { id: user.id },
    data: { username, email, name, birth, gender, location },
  });
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
