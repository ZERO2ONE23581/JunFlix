import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const inputs = req.body;
  const { user } = req.session;
  const { board_id } = req.query;
  const user_id = inputs.user_id;
  const isQueryMatch = Boolean(user?.id === user_id);
  if (!user) return res.json({ ok: false, error: 'must login.' });
  if (!board_id) return res.json({ ok: false, error: 'query missed.' });
  if (!inputs) return res.json({ ok: false, error: 'inputs misssed.' });
  if (!isQueryMatch) return res.json({ ok: false, error: 'invalid query.' });
  //
  const board = await client.board.findUnique({
    where: { id: +board_id },
    select: { id: true, host_id: true },
  });
  if (!board) return res.json({ ok: false, error: 'no board found.' });

  const isHost = Boolean(board.host_id === user.id);
  if (!isHost) return res.json({ ok: false, error: 'invalid  host.' });
  //
  await client.board.update({
    where: { id: board.id },
    data: {
      title: inputs.title,
      genre: inputs.genre,
      onPrivate: inputs.onPrivate,
      description: inputs.description,
    },
  });
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
