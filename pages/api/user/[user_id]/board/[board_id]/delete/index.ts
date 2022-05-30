import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../../../../src/libs/server/withHandler';
import client from '../../../../../../../src/libs/server/prisma_client';
import { withApiSession } from '../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const delConfirm = req.body;
  const { user } = req.session;
  const { user_id, board_id } = req.query;
  const queryExists = Boolean(user_id && board_id);

  //Error handling
  if (!user) return res.json({ ok: false, error: 'MUST LOGIN!' });
  if (!queryExists) return res.json({ ok: false, error: 'QUERY ERROR' });
  if (!delConfirm) return res.json({ ok: false, error: 'DELETE UNCONFIRMED!' });
  if (user?.id !== +user_id)
    return res.json({ ok: false, error: 'UNAUTHORIZED TO DELETE THIS BOARD!' });
  //
  const foundBoard = await client.board.findUnique({
    where: { id: +board_id.toString() },
    select: { id: true, UserID: true },
  });
  if (!foundBoard) return res.json({ ok: false, error: 'NO BOARD FOUND!' });
  //
  await client.board.delete({
    where: { id: foundBoard.id },
  });
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
