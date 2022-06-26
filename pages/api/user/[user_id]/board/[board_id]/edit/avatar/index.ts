import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../../../../../src/libs/server/withHandler';
import client from '../../../../../../../../src/libs/server/prisma_client';
import { withApiSession } from '../../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id, board_id } = req.query;
  const { avatar } = req.body;
  const isQuery = Boolean(user_id && board_id);
  const isOwner = Boolean(user?.id === +user_id);
  if (!user) return res.json({ ok: false, error: 'login needed.' });
  if (!isQuery) return res.json({ ok: false, error: 'invalid url.' });
  if (!avatar) return res.json({ ok: false, error: 'No input.' });
  if (!isOwner) return res.json({ ok: false, error: 'no rights to edit.' });

  const FoundBoard = await client.board.findUnique({
    where: { id: +board_id.toString() },
    select: { id: true, avatar: true },
  });
  if (!FoundBoard) return res.json({ ok: false, error: 'NO BOARD FOUND!' });

  await client.board.update({
    where: { id: FoundBoard.id },
    data: { avatar },
  });
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
