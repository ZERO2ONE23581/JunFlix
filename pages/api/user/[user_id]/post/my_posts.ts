import client from '../../../../../src/libs/server/prisma_client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  if (!user) return res.json({ ok: false, error: 'MUST LOGIN' });
  //
  const posts = await client.post.findMany({
    where: { UserID: user.id },
    include: {
      user: { select: { username: true } },
      board: { select: { title: true } },
    },
  });
  return res.json({ ok: true, posts });
}
export default withApiSession(withHandler({ methods: ['GET'], handler }));
