import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../../../../src/libs/server/withHandler';
import prismaClient from '../../../../../../../src/libs/server/prisma_client';
import { withApiSession } from '../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { title, content } = req.body;
  const { user_id, board_id } = req.query;
  const noQuery = !Boolean(user_id && board_id);

  //Error handling
  if (!user) return res.json({ ok: false, error: 'LOGIN NEEDED!' });
  if (noQuery) return res.json({ ok: false, error: 'QUERY ERROR!' });
  if (!title) return res.json({ ok: false, error: 'NO INPUT DATA!' });
  if (user?.id !== +user_id)
    return res.json({ ok: false, error: 'NO RIGHTS!' });

  //Select Board -> Create Post on the board
  const currentBoard = await prismaClient.board.findUnique({
    where: { id: +board_id },
    select: { id: true, UserID: true },
  });
  if (!currentBoard) return res.json({ ok: false, error: 'NO BOARD FOUND!' });
  //
  await prismaClient.post.create({
    data: {
      title,
      content,
      UserID: currentBoard.UserID,
      BoardID: currentBoard.id,
    },
  });
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
