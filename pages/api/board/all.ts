import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../src/libs/server/prisma_client';
import withHandler from '../../../src/libs/server/withHandler';
import { withApiSession } from '../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const boards = await client.board.findMany({
    include: {
      host: true,
      posts: true,
      folllowers: true,
      _count: true,
    },
  });
  const isArray = Boolean(boards.length > 0);
  if (!isArray) return res.json({ ok: false, error: 'no boards found.' });
  //
  return res.json({ ok: true, boards });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
