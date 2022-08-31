import client from '../../src/libs/server/prisma_client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../src/libs/server/withHandler';
import { withApiSession } from '../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const boards = await client.board.findMany({
    select: {
      id: true,
      title: true,
      genre: true,
      avatar: true,
      UserID: true,
      followers: true,
      user: { select: { username: true } },
    },
    orderBy: {
      id: 'desc',
    },
  });
  if (!boards) return res.json({ ok: false, error: 'NO BOARDS FOUND' });
  return res.json({ ok: true, boards });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
