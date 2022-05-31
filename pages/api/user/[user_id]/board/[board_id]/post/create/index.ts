import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../../../../../src/libs/server/withHandler';
import client from '../../../../../../../../src/libs/server/prisma_client';
import { withApiSession } from '../../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { title, content, avatar } = req.body;
  const { user_id, board_id } = req.query;
  const queryExists = Boolean(user_id && board_id);
  if (!user) return res.json({ ok: false, error: 'MUST LOGIN!' });
  if (!queryExists) return res.json({ ok: false, error: 'QUERY ERROR!' });
  if (!title) return res.json({ ok: false, error: 'INPUT DATA REQUIRED!' });
  if (user?.id !== +user_id)
    return res.json({ ok: false, error: 'UNAUTHORIZED!' });
  //
  const currentBoard = await client.board.findUnique({
    where: { id: +board_id },
    select: { id: true, UserID: true },
  });
  if (!currentBoard) return res.json({ ok: false, error: 'NO BOARD FOUND!' });
  //
  const post = await client.post.create({
    data: {
      avatar,
      title,
      content,
      UserID: currentBoard.UserID,
      BoardID: currentBoard.id,
    },
    select: { UserID: true, BoardID: true, id: true },
  });
  return res.json({ ok: true, post });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
