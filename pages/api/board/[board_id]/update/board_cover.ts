import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { board_id } = req.query;
  const { avatar, user_id } = req.body;
  const isInputs = Boolean(avatar && user_id);
  const isHost = Boolean(user?.id === user_id);
  if (!user) return res.json({ ok: false, error: 'must login.' });
  if (!isHost) return res.json({ ok: false, error: 'invalid host.' });
  if (!board_id) return res.json({ ok: false, error: 'query missed.' });
  if (!isInputs) return res.json({ ok: false, error: 'inputs misssed.' });

  const board = await client.board.findUnique({
    where: { id: +board_id },
    select: { id: true },
  });
  if (!board) return res.json({ ok: false, error: 'no board found' });
  //
  await client.board.update({
    where: { id: board.id },
    data: { avatar },
  });
  return res.json({ ok: true, avatar });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
