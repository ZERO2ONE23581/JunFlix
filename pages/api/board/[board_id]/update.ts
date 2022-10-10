import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { board_id } = req.query;
  const { user_id, title, genre, description, isPrivate } = req.body;
  const mustInputs = Boolean(title && user_id);
  const isOwner = Boolean(user?.id === user_id);
  //
  if (!user) return res.json({ ok: false, error: 'login needed.' });
  if (!board_id) return res.json({ ok: false, error: 'query error.' });
  if (!isOwner) return res.json({ ok: false, error: 'invalid user.' });
  if (!mustInputs) return res.json({ ok: false, error: 'input missed.' });
  //
  const board = await client.board.findUnique({
    where: { id: +board_id },
    select: { id: true, UserID: true },
  });
  if (!board) return res.json({ ok: false, error: 'no board found.' });
  if (board.UserID !== user_id)
    return res.json({ ok: false, error: 'invalid board host.' });
  //
  await client.board.update({
    where: { id: board.id },
    data: { title, genre, description, isPrivate },
  });
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
