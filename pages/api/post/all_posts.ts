import client from '../../../src/libs/server/prisma_client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../src/libs/server/withHandler';
import { withApiSession } from '../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //Get all posts exist
  const allPosts = await client.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      avatar: true,
      follow: true,
      UserID: true,
      BoardID: true,
      user: { select: { username: true } },
      board: { select: { title: true } },
    },
  });
  //
  return res.json({ ok: true, allPosts });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
