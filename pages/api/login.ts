import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../src/libs/server/prisma_client';
import withHandler from '../../src/libs/server/withHandler';
import { withApiSession } from '../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userID, password } = req.body;
    if (!Boolean(userID && password))
      return res.json({ ok: false, error: 'input missed.' });

    const user = await client.user.findUnique({
      where: { userId: userID },
      select: { id: true, userId: true, password: true },
    });
    if (!user)
      return res.json({ ok: false, error: '존재하지 않는 아이디 입니다.' });

    const isMatch = await bcrypt.compare(password, user.password!);
    if (!isMatch)
      return res.json({ ok: false, error: '비밀번호가 일치하지 않습니다.' });

    //찾은 유저의 id -> 쿠키에 저장 (로그인하는 방법)
    req.session.user = {
      id: user.id,
    };
    await req.session.save();
    return res.json({ ok: true });
  }

  if (req.method === 'GET') {
    const { user } = req.session;
    if (!user) return res.json({ ok: false, error: 'must login.' });

    const loggedInUser = await client.user.findUnique({
      where: { id: user?.id },
    });
    if (!loggedInUser) return req.session.destroy();

    return res.json({ ok: true, loggedInUser });
  }
}
export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler, isPrivate: false })
);
