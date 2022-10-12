import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { post_id } = req.query;
  const { board_id } = req.body;
  if (!user) return res.json({ ok: false, error: 'must login.' });
  if (!post_id) return res.json({ ok: false, error: 'query missed.' });
  if (!board_id) return res.json({ ok: false, error: 'input missed.' });
  //
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
  const isPassed = Boolean(
    await client.post.delete({ where: { id: post.id } })
  );
  if (!isPassed) return res.json({ ok: false, error: 'delete failed.' });
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
