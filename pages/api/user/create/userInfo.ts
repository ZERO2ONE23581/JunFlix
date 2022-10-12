import { hash } from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const inputs = req.body;
  const email = inputs.email;
  const password = inputs.password;
  const pw_confirm = inputs.pw_confirm;
  const isPwMatch = Boolean(password === pw_confirm);
  if (!inputs) return res.json({ ok: false, error: 'inputs missed.' });
  if (!isPwMatch)
    return res.json({ ok: false, error: 'password not matched.' });

  //email check
  const isExist = Boolean(await client.user.findUnique({ where: { email } }));
  if (isExist) return res.json({ ok: false, error: 'already in use email.' });

  //crypt password
  hash(password, 10, async function (err, hasedPassword) {
    if (err) return res.json({ ok: false, error: 'password hashing failed.' });
    const username = inputs.username;
    if (!username) {
      const user = await client.user.create({
        data: {
          email,
          username: 'Anonymous',
          userId: inputs.userId,
          password: hasedPassword,
        },
      });
      return res.json({ ok: true, type: 'userInfo', user_id: user.id });
    }
    if (username) {
      const user = await client.user.create({
        data: {
          email,
          username,
          userId: inputs.userId,
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
