import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { board_id } = req.body;
  const { user } = req.session;
  const { post_id } = req.query;
  if (!user) return res.json({ ok: false, error: 'must login.' });
  if (!post_id) return res.json({ ok: false, error: 'query missed.' });
  if (!board_id) return res.json({ ok: false, error: 'input missed.' });

  const post = await client.post.findUnique({
    where: { id: +post_id },
    include: { board: true, host: true, likes: true, comments: true },
  });
  if (!post) return res.json({ ok: false, error: 'no post found.' });

  const isBoardMatch = Boolean(post.board_id === board_id);
  if (!isBoardMatch) return res.json({ ok: false, error: 'invalid board.' });
  //
  return res.json({ ok: true, post });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
