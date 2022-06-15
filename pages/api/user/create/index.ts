import { hash } from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, userID, password, confirmPassword, email } = req.body;
  const isInputData = Boolean(userID && password && confirmPassword);
  if (!isInputData)
    return res.json({ ok: false, error: '데이터가 미입력 되었습니다.' });
  if (Boolean(password !== confirmPassword))
    return res.json({ ok: false, error: '비밀번호가 일치하지 않습니다.' });
  //
  if (email) {
    const EmailExists = Boolean(
      await client.user.findUnique({
        where: { email },
      })
    );
    if (EmailExists)
      return res.json({ ok: false, error: '이미 등록된 이메일 입니다.' });
    hash(password, 10, async function (err, hasedPassword) {
      if (err) return console.log('HASH PASSWORD FAIL');
      if (!username) {
        const user = await client.user.create({
          data: {
            username: 'Anonymous',
            userId: userID,
            password: hasedPassword,
            email,
          },
          select: { id: true },
        });
        const createdID = user.id;
        return res.json({ ok: true, createdID });
      } else {
        const user = await client.user.create({
          data: {
            username,
            userId: userID,
            password: hasedPassword,
            email,
          },
          select: { id: true },
        });
        const createdID = user.id;
        return res.json({ ok: true, createdID });
      }
    });
  } else {
    hash(password, 10, async function (err, hasedPassword) {
      if (err) return console.log('HASH PASSWORD FAIL');
      if (!username) {
        const user = await client.user.create({
          data: {
            username: 'Anonymous',
            userId: userID,
            password: hasedPassword,
          },
          select: { id: true },
        });
        const createdID = user.id;
        return res.json({ ok: true, createdID });
      } else {
        const user = await client.user.create({
          data: {
            username,
            userId: userID,
            password: hasedPassword,
          },
          select: { id: true },
        });
        const createdID = user.id;
        return res.json({ ok: true, createdID });
      }
    });
  }
}
export default withApiSession(
  withHandler({ methods: ['POST'], handler, isPrivate: false })
);
