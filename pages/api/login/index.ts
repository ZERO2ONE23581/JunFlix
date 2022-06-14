import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../src/libs/server/prisma_client';
import withHandler from '../../../src/libs/server/withHandler';
import { withApiSession } from '../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userID, password } = req.body;
  const msutData = Boolean(userID && password);

  if (req.method === 'POST') {
    if (!msutData) return res.json({ ok: false, error: 'INPUT DATA REQUIRED' });

    //UserId check
    const foundUser = await client.user.findUnique({
      where: { userId: userID.toString() },
      select: { id: true, userId: true, password: true },
    });
    if (!foundUser)
      return res.json({ ok: false, error: '아이디가 일치하지 않습니다.' });

    //Password Check
    const passwordMatch = await bcrypt.compare(password, foundUser.password!);
    if (!passwordMatch)
      return res.json({ ok: false, error: '비밀번호가 일치하지 않습니다.' });

    //Save Cookie
    req.session.user = {
      id: foundUser?.id,
    };
    await req.session.save();
    return res.json({ ok: true });
  }

  if (req.method === 'GET') {
    const { user } = req.session;
    if (user) {
      const loggedInUser = await client.user.findUnique({
        where: { id: user?.id },
      });
      return res.json({ ok: true, loggedInUser });
    }
    return res.json({ ok: false, error: 'YOU NEED TO SIGN IN FIRST!' });
  }
}
export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler, isPrivate: false })
);
