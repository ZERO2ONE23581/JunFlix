import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../../../src/libs/server/withHandler';
import prismaClient from '../../../../../../src/libs/server/prisma_client';
import { withApiSession } from '../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //PUBLIC SIDE: READ, PRIVATE SIDE: UPDATE, DELETE
  const { user_id, board_id } = req.query;
  const noQuery = !Boolean(user_id && board_id);

  //error handling
  if (noQuery) return res.json({ ok: false, error: 'QUERY ERROR' });

  //Select my board -> with valid User
  const board = await prismaClient.board.findUnique({
    where: { id: +board_id.toString() },
    include: { user: { select: { username: true } } },
  });
  if (board?.UserID !== +user_id)
    return res.json({ ok: false, error: 'INVALID USER!' });
  //
  return res.json({ ok: true, board });
}
export default withApiSession(withHandler({ methods: ['GET'], handler }));
