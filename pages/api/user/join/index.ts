import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, userID, password, confirmPw, email } = req.body;

  //
  const data = Boolean(username && (userID || email) && password && confirmPw);
  if (!data)
    return res.json({ ok: false, error: '데이터가 미입력 되었습니다.' });

  //비밀번호 일치 체크
  if (Boolean(password !== confirmPw))
    return res.json({ ok: false, error: '비밀번호가 일치하지 않습니다.' });

  //중복체크
  if (userID) {
    const dupData = await client.user.findUnique({
      where: { userId: userID },
    });
    if (dupData)
      return res.json({ ok: false, error: '이미 등록된 아이디 입니다.' });
  }
  if (email) {
    const dupData = await client.user.findUnique({
      where: { email },
    });
    if (dupData)
      return res.json({ ok: false, error: '이미 등록된 이메일 입니다.' });
  }

  //유저생성
  await client.user.create({
    data: {
      username,
      userId: userID.toString(),
      password,
      email,
    },
  });
  //
  return res.json({ ok: true });
}
export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler, isPrivate: false })
);
