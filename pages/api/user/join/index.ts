import { hash } from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, userID, password, passwordConfirm, email } = req.body;
  const mustData = Boolean(
    username && userID && email && password && passwordConfirm
  );
  if (!mustData) return res.json({ ok: false, error: 'INPUT DATA REQUIRED' });

  //비밀번호 일치 체크
  if (Boolean(password !== passwordConfirm))
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
  //Hash Password -> Create User
  hash(password, 10, async function (err, hasedPassword) {
    if (err) return console.log('HASH PASSWORD FAIL');
    //유저생성
    await client.user.create({
      data: {
        username,
        userId: userID,
        password: hasedPassword,
        email,
      },
    });
  });
  //
  return res.json({ ok: true });
}
export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler, isPrivate: false })
);
