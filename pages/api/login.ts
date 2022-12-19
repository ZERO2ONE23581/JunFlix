import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../src/libs/server/prisma_client';
import withHandler from '../../src/libs/server/withHandler';
import { withApiSession } from '../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    const isInputs = Boolean(email && password);
    if (!isInputs) return res.json({ ok: false, error: 'miss_input' });

    //userId check
    const user = await client.user.findUnique({
      where: { email },
      select: { id: true, userId: true, password: true },
    });
    if (!user) return res.json({ ok: false, error: 'email_not_exists' });

    //password check
    const isMatch = await bcrypt.compare(password, user.password!);
    if (!isMatch) return res.json({ ok: false, error: 'invalid_pw' });

    //save user_id in Cookie session
    req.session.user = {
      id: user.id,
    };
    await req.session.save();
    return res.json({ ok: true, msg: 'logged' });
  }

  if (req.method === 'GET') {
    const { user } = req.session;
    if (!user) return res.json({ ok: false, error: 'no_data' });
    const loggedInUser = await client.user.findUnique({
      where: { id: +user?.id.toString() },
      include: {
        likes: true,
        posts: true,
        tokens: true,
        boards: true,
        comments: true,
        followers: true,
        followings: true,
      },
    });
    if (!loggedInUser) {
      res.json({ ok: false });
      return req.session.destroy();
    }
    return res.json({ ok: true, loggedInUser });
  }
}
export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler, isPrivate: false })
);
