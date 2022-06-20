import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { avatar, createdID } = req.body;
  const isInputData = avatar && createdID;
  if (user) return res.json({ ok: false, error: '로그아웃 하셔야 합니다.' });
  if (!isInputData)
    return res.json({ ok: false, error: 'NO 데이터가 미입력 되었습니다.' });

  const foundUser = await client.user.findUnique({
    where: { id: createdID },
  });
  if (!foundUser) return res.json({ ok: false, error: 'NO USER FOUND.' });

  await client.user.update({
    where: { id: foundUser.id },
    data: { avatar },
  });
  return res.json({ ok: true });
}
export default withApiSession(
  withHandler({ methods: ['POST'], handler, isPrivate: false })
);
