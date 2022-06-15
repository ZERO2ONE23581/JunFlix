import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../../../src/libs/server/withHandler';
import client from '../../../../../../src/libs/server/prisma_client';
import { withApiSession } from '../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id, board_id } = req.query;
  const queryExists = Boolean(user_id && board_id);
  if (!queryExists) return res.json({ ok: false, error: 'QUERY ERROR' });
  const board = await client.board.findUnique({
    where: { id: +board_id.toString() },
    include: {
      user: { select: { id: true, username: true } },
      followers: {
        select: {
          id: true,
          UserID: true,
          BoardID: true,
          user: { select: { id: true, username: true } },
        },
        orderBy: {
          id: 'desc',
        },
      },
      posts: {
        select: {
          id: true,
          title: true,
          UserID: true,
          BoardID: true,
          avatar: true,
        },
        orderBy: {
          id: 'desc',
        },
      },
      _count: { select: { followers: true, posts: true } },
    },
  });
  if (!board) return res.json({ ok: false, error: 'NO BOARD FOUND!' });
  if (board?.UserID !== +user_id)
    return res.json({ ok: false, error: 'INVALID USER!' });
  //
  const isFollowing = Boolean(
    await client.following.findFirst({
      where: { UserID: user?.id, BoardID: board.id },
    })
  );
  //
  return res.json({ ok: true, board, isFollowing });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
