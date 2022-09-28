import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../src/libs/server/prisma_client';
import withHandler from '../../src/libs/server/withHandler';
import { withApiSession } from '../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const posts = await client.post.findMany({
    orderBy: {
      id: 'desc',
    },
    include: {
      user: true,
      board: true,
    },
  });
  //
  return res.json({ ok: true, posts });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
