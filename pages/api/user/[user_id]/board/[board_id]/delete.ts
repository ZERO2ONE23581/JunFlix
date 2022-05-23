import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../../../src/libs/server/withHandler';
import prismaClient from '../../../../../../src/libs/server/prisma_client';
import { withApiSession } from '../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const delConfirm = req.body;
  const { user } = req.session;
  const { user_id, board_id } = req.query;
  const noQuery = !Boolean(user_id && board_id);

  //Error handling
  if (!user) return res.json({ ok: false, error: 'MUST LOGIN!' });
  if (noQuery) return res.json({ ok: false, error: 'QUERY ERROR' });
  if (!delConfirm) return res.json({ ok: false, error: 'DELETE UNCONFIRMED!' });
  if (user?.id !== +user_id)
    return res.json({ ok: false, error: 'UNAUTHORIZED TO DELETE THIS BOARD!' });
  //
  const foundBoard = await prismaClient.board.findUnique({
    where: { id: +board_id.toString() },
    select: { id: true, UserID: true },
  });
  if (!foundBoard) return res.json({ ok: false, error: 'NO BOARD FOUND!' });
  //
  await prismaClient.board.delete({
    where: { id: foundBoard.id },
  });
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
