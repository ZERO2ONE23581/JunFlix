import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../../src/libs/server/withHandler';
import prismaClient from '../../../../../src/libs/server/prisma_client';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { board_id } = req.query;
  const { title, content } = req.body;
  //
  if (!user) return res.json({ ok: false, error: 'LOGIN NEEDED!' });
  if (!board_id) return res.json({ ok: false, error: 'QUERY ERROR!' });
  if (!title) return res.json({ ok: false, error: 'NO INPUT DATA!' });

  //보드 존재 x || 현 보드의 주인이 아닌경우 -> error
  const currentBoard = await prismaClient.board.findUnique({
    where: { id: +board_id },
    select: { id: true, UserID: true },
  });
  if (!currentBoard) return res.json({ ok: false, error: 'NO BOARD FOUND!' });
  if (user.id !== currentBoard.UserID)
    return res.json({ ok: false, error: 'NO RIGHT TO CREATE POST!' });

  //Create Post
  await prismaClient.post.create({
    data: {
      title,
      content,
      UserID: user.id,
      BoardID: currentBoard.id,
    },
  });
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
