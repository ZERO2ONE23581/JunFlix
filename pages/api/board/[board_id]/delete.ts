import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../src/libs/server/withHandler';
import prismaClient from '../../../../src/libs/server/prisma_client';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { board_id } = req.query;
  const deleteConfirm = req.body;
  //
  if (!user) return res.json({ ok: false, error: 'LOGIN NEEDED!' });
  if (!board_id) return res.json({ ok: false, error: 'BOARD ID UNDEFINED!' });
  if (!deleteConfirm)
    return res.json({ ok: false, error: 'DELETE CONFIRM NEEDED!' });
  //
  const foundBoard = await prismaClient.board.findUnique({
    where: { id: +board_id.toString() },
    select: { id: true, UserID: true },
  });
  if (!foundBoard) return res.json({ ok: false, error: 'NO BOARD FOUND!' });
  if (foundBoard?.UserID !== user?.id)
    return res.json({ ok: false, error: 'UNAUTHORIZED!' });
  //
  await prismaClient.board.delete({
    where: { id: foundBoard.id },
  });
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
