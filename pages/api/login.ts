import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../src/libs/server/prisma_client';
import withHandler from '../../src/libs/server/withHandler';
import { withApiSession } from '../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, password } = req.body;
    const isInputs = Boolean(userId && password);
    if (!isInputs) return res.json({ ok: false, error: 'input missed.' });

    //userId check
    const user = await client.user.findUnique({
      where: { userId },
      select: { id: true, userId: true, password: true },
    });
    if (!user)
      return res.json({ ok: false, error: '존재하지 않는 아이디 입니다.' });

    //password check
    const isMatch = await bcrypt.compare(password, user.password!);
    if (!isMatch)
      return res.json({ ok: false, error: '비밀번호가 일치하지 않습니다.' });

    //save user_id in Cookie session
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
      include: {
        likes: true,
        posts: true,
        tokens: true,
        boards: true,
        reviews: true,
        comments: true,
        followers: true,
        followings: true,
      },
    });
    if (!loggedInUser) return req.session.destroy();

    return res.json({ ok: true, loggedInUser });
  }
}
export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler, isPrivate: false })
);
