import { hash } from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password, password_confirm, avatar } = req.body;
  const userId = email.slice(0, email.indexOf('@'));
  const isInputs = Boolean(email && password && password_confirm);
  const isPasswordMatch = Boolean(password === password_confirm);

  if (!isInputs) return res.json({ ok: false, error: 'miss_input' });
  if (!isPasswordMatch)
    return res.json({ ok: false, error: 'invalid password match.' });

  const EmailExist = Boolean(
    await client.user.findUnique({ where: { email } })
  );
  if (EmailExist) return res.json({ ok: false, error: 'email_exists' });

  hash(password, 10, async function (err, hasedPassword) {
    if (err) return res.json({ ok: false, error: 'password hashing failed.' });
    const user = await client.user.create({
      data: { email, userId, password: hasedPassword, avatar },
    });
    if (user) {
      //save user_id in Cookie session
      req.session.user = {
        id: user.id,
      };
      await req.session.save();
      return res.json({ ok: true });
    }
  });
}
export default withApiSession(
  withHandler({ methods: ['POST'], handler, isPrivate: false })
);
