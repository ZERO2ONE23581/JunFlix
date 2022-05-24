import client from '../../../src/libs/server/prisma_client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../src/libs/server/withHandler';
import { withApiSession } from '../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //Get all boards exist
  const allBoards = await client.board.findMany({
    select: {
      id: true,
      title: true,
      genre: true,
      avatar: true,
      UserID: true,
      user: { select: { username: true } },
    },
  });
  //
  return res.json({ ok: true, allBoards });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
