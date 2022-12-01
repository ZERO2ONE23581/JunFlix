import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../src/libs/server/prisma_client';
import withHandler from '../../../src/libs/server/withHandler';
import { withApiSession } from '../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const posts = await client.post.findMany({
    include: {
      board: true,
      likes: true,
      _count: true,
      comments: true,
      host: { include: { _count: true } },
    },
    orderBy: { id: 'desc' },
  });
  const isArray = Boolean(posts.length > 0);
  if (!isArray) return res.json({ ok: false, error: 'no posts found.' });
  //
  return res.json({ ok: true, posts });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
