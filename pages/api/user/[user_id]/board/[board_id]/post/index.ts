import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user_id, board_id } = req.query;
  const posts = await client.post.findMany({
    where: { UserID: +user_id, BoardID: +board_id },
    include: {
      user: { select: { username: true } },
      board: { select: { title: true, genre: true } },
    },
  });
  return res.json({ ok: true, posts });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
