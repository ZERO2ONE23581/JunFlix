import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { post_id } = req.query;
  const { title, avatar, description, board_id } = req.body;
  const isInputs = Boolean(title && board_id);
  if (!user) return res.json({ ok: false, error: 'must login.' });
  if (!post_id) return res.json({ ok: false, error: 'query missed.' });
  if (!isInputs) return res.json({ ok: false, error: 'inputs missed.' });

  const post = await client.post.findUnique({
    where: { id: +post_id },
    select: { host_id: true, board_id: true, id: true },
  });
  if (!post) return res.json({ ok: false, error: 'no post found.' });
  const isHost = Boolean(post.host_id === user.id);

  if (!isHost) return res.json({ ok: false, error: 'invalid host.' });
  const isBoardMatch = Boolean(post.board_id === board_id);

  if (!isBoardMatch) return res.json({ ok: false, error: 'invalid board.' });
  //
  const isPassed = await client.post.update({
    where: { id: post.id },
    data: { avatar, title, description },
  });
  if (!isPassed) return res.json({ ok: false, error: 'update failed.' });
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
