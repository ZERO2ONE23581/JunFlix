import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userID, password } = req.body;
  const isInputData = Boolean(userID && password);

  if (req.method === 'POST') {
    if (!isInputData)
      return res.json({ ok: false, error: '데이터가 미입력 되었습니다.' });
    const user = await client.user.findUnique({
      where: { userId: userID },
      select: { id: true, userId: true, password: true },
    });
    if (!user)
      return res.json({ ok: false, error: '존재하지 않는 아이디 입니다.' });
    const isCorrectPassword = await bcrypt.compare(password, user.password!);
    if (!isCorrectPassword)
      return res.json({ ok: false, error: '비밀번호가 일치하지 않습니다.' });
    req.session.user = {
      id: user.id,
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
