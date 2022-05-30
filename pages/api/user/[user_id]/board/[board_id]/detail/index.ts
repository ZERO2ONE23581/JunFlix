import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../../../../src/libs/server/withHandler';
import client from '../../../../../../../src/libs/server/prisma_client';
import { withApiSession } from '../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user_id, board_id } = req.query;
  const queryExists = Boolean(user_id && board_id);
  if (!queryExists) return res.json({ ok: false, error: 'QUERY ERROR' });

  //Select my board -> with valid User
  const board = await client.board.findUnique({
    where: { id: +board_id.toString() },
    include: { user: { select: { username: true } } },
  });
  if (board?.UserID !== +user_id)
    return res.json({ ok: false, error: 'INVALID USER!' });
  //
  return res.json({ ok: true, board });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
  //public can read any boards!
);
