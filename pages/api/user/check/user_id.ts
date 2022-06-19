import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.body;
  if (!userId)
    return res.json({ ok: false, error: '데이터가 미입력 되었습니다.' });
  const alreadyExists = await client.user.findUnique({
    where: { userId },
  });
  if (alreadyExists)
    return res.json({ ok: false, error: '이미 가입된 아이디 입니다.' });
  return res.json({ ok: true, userId });
}
export default withApiSession(
  withHandler({ methods: ['POST'], handler, isPrivate: false })
);
