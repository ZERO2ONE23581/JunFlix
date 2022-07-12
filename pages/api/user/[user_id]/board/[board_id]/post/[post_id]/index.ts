import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../../../../../src/libs/server/withHandler';
import client from '../../../../../../../../src/libs/server/prisma_client';
import { withApiSession } from '../../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id, board_id, post_id } = req.query;
  const queryExists = Boolean(user_id && board_id && post_id);
  if (!queryExists) return res.json({ ok: false, error: 'QUERY ERROR' });
  const post = await client.post.findUnique({
    where: { id: +post_id.toString() },
    include: {
      likes: {
        include: {
          user: { select: { id: true, username: true } },
        },
        orderBy: {
          id: 'desc',
        },
      },
      comments: {
        include: {
          user: { select: { id: true, username: true } },
        },
        orderBy: {
          id: 'desc',
        },
      },
      user: { select: { username: true, avatar: true } },
      board: true,
      _count: { select: { likes: true, comments: true } },
    },
  });
  if (!post) return res.json({ ok: false, error: 'NO POST FOUND' });
  //
  return res.json({ ok: true, post });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
