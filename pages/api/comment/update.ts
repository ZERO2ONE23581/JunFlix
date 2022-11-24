import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../src/libs/server/prisma_client';
import withHandler from '../../../src/libs/server/withHandler';
import { withApiSession } from '../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { text, post_id, cmt_id } = req.body;
  if (!user) return res.json({ ok: false, error: 'must login' });
  if (!Boolean(text && post_id && cmt_id))
    return res.json({ ok: false, error: 'input missed' });

  const post = await client.post.findUnique({
    where: { id: +post_id.toString() },
  });
  if (!post) return res.json({ ok: false, error: 'no post found' });

  const comment = await client.comment.findUnique({
    where: { id: +cmt_id.toString() },
  });
  if (!comment) return res.json({ ok: false, error: 'no comment found' });
  const isValidPost = Boolean(post.id === comment.post_id);
  if (!isValidPost) return res.json({ ok: false, error: 'invalid post' });

  const isUpdated = Boolean(
    await client.comment.update({ data: { text }, where: { id: comment.id } })
  );
  return res.json({ ok: isUpdated });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
