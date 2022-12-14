import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../src/libs/server/prisma_client';
import withHandler from '../../../src/libs/server/withHandler';
import { withApiSession } from '../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const users = await client.user.findMany({
    orderBy: { followers: { _count: 'desc' } },
    select: {
      id: true,
      userId: true,
      _count: { select: { posts: true, followers: true } },
    },
  });
  const noData = !Boolean(users.length > 0);
  return res.json({ ok: true, users, noData });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
