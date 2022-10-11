import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../src/libs/server/prisma_client';
import withHandler from '../../../src/libs/server/withHandler';
import { withApiSession } from '../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id, title, description, genre } = req.body;
  const mustInputs = Boolean(user_id && title);
  const userMatch = Boolean(user?.id === user_id);
  if (!user) return res.json({ ok: false, error: 'must login.' });
  if (!userMatch) return res.json({ ok: false, error: 'invalid user.' });
  if (!mustInputs) return res.json({ ok: false, error: 'input missed.' });
  //
  const board = await client.board.create({
    data: {
      title,
      genre,
      description,
      user: { connect: { id: user_id } },
    },
    select: {
      id: true,
      UserID: true,
      title: true,
    },
  });
  //
  return res.json({ ok: true, board });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
