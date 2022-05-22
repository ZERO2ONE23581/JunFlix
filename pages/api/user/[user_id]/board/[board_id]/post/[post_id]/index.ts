import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../../../../../src/libs/server/withHandler';
import prismaClient from '../../../../../../../../src/libs/server/prisma_client';
import { withApiSession } from '../../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user_id, board_id, post_id } = req.query;
  const noQuery = !Boolean(user_id && board_id && post_id);

  //error handling
  if (noQuery) return res.json({ ok: false, error: 'QUERY ERROR!' });

  //Select board -> with Valid User + Board
  const post = await prismaClient.post.findUnique({
    where: { id: +post_id.toString() },
  });
  if (post?.UserID !== +user_id)
    return res.json({ ok: false, error: 'INVALID USER!' });
  if (post?.BoardID !== +board_id)
    return res.json({ ok: false, error: 'INVALID BOARD!' });
  //
  return res.json({ ok: true, post });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
  //public can read any posts!
);
