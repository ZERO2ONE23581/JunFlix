import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../../../../src/libs/server/withHandler';
import client from '../../../../../../../src/libs/server/prisma_client';
import { withApiSession } from '../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user_id, board_id } = req.query;
  const queryExists = Boolean(user_id && board_id);
  if (!queryExists) return res.json({ ok: false, error: 'QUERY ERROR!' });

  //Select post on current Board!
  const allPosts = await client.post.findMany({
    where: { UserID: +user_id, BoardID: +board_id },
    select: {
      id: true,
      title: true,
      avatar: true,
      UserID: true,
      BoardID: true,
      createdAt: true,
    },
  });
  //
  return res.json({ ok: true, allPosts });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
  //public can read any posts!
);
