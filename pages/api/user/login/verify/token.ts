import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const token = req.body;
  const isInputData = Boolean(token);
  if (user) return res.json({ ok: false, error: '로그아웃 하셔야 합니다.' });
  if (!isInputData)
    return res.json({ ok: false, error: '데이터가 미입력 되었습니다.' });

  const FoundToken = await client.token.findUnique({
    where: { tokenNum: +token },
    select: { UserID: true },
  });
  if (!FoundToken)
    return res.json({ ok: false, error: '토큰번호가 일치하지 않습니다.' });

  const FoundUser = await client.user.findUnique({
    where: { id: FoundToken.UserID },
    select: { id: true, userId: true, password: true },
  });
  if (!FoundUser)
    return res.json({ ok: false, error: 'NO USER FOUND FOR THIS TOKEN..' });

  await client.token.deleteMany({
    where: { UserID: FoundToken.UserID },
  });
  const FoundUserID = FoundUser.userId;
  return res.json({ ok: true, FoundUserID });
}
export default withApiSession(
  withHandler({ methods: ['POST'], handler, isPrivate: false })
);
