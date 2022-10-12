import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../src/libs/server/prisma_client';
import withHandler from '../../../src/libs/server/withHandler';
import { withApiSession } from '../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { board_id, title, description, avatar } = req.body;
  const isInputs = Boolean(title && board_id);
  if (!user) return res.json({ ok: false, error: 'must login.' });
  if (!isInputs) return res.json({ ok: false, error: 'inputs missed.' });
  //
  const board = await client.board.findUnique({
    where: { id: board_id },
    select: { id: true, host_id: true },
  });
  if (!board) return res.json({ ok: false, error: 'no board found.' });
  const isHost = Boolean(user.id === board.host_id);
  if (!isHost) return res.json({ ok: false, error: 'invalid host.' });
  //
  const isPassed = Boolean(
    await client.post.create({
      data: {
        title,
        avatar,
        board_id,
        description,
        host_id: user.id,
      },
    })
  );
  if (!isPassed) return res.json({ ok: false, error: 'post failed.' });
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
