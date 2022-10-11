import { hash } from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, userId, password, pw_confirm, email } = req.body;
  const isPassMatch = Boolean(password === pw_confirm);
  const mustInputs = Boolean(userId && password && pw_confirm && email);
  if (!isPassMatch) return res.json({ ok: false, error: 'invalid pw.' });
  if (!mustInputs) return res.json({ ok: false, error: 'inputs missed.' });

  //email check
  const isExist = Boolean(await client.user.findUnique({ where: { email } }));
  if (isExist)
    return res.json({ ok: false, error: '이미 등록된 이메일 입니다.' });

  //crypt pw
  hash(password, 10, async function (err, hasedPassword) {
    if (err) return console.log('HASH PASSWORD FAIL');

    if (!username) {
      const user = await client.user.create({
        data: {
          email,
          userId,
          username: 'Anonymous',
          password: hasedPassword,
        },
      });
      return res.json({ ok: true, type: 'userInfo', user_id: user.id });
    }

    if (username) {
      const user = await client.user.create({
        data: {
          email,
          userId,
          username,
          password: hasedPassword,
        },
      });
      return res.json({ ok: true, type: 'userInfo', user_id: user.id });
    }
  });
}
export default withApiSession(
  withHandler({ methods: ['POST'], handler, isPrivate: false })
);
