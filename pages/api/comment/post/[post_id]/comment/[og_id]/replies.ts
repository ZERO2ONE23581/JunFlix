import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { post_id, og_id } = req.query;
  const isQuery = Boolean(post_id && og_id);
  if (!isQuery) return res.json({ ok: false, error: 'post query id missed' });

  const post = await client.post.findUnique({
    where: { id: +post_id.toString() },
  });
  if (!post) return res.json({ ok: false, error: 'no post found' });

  const original = await client.comment.findUnique({
    include: { host: true },
    where: { id: +og_id.toString() },
  });
  if (!original)
    return res.json({ ok: false, error: 'no original comment found' });

  const comments = await client.comment.findMany({
    where: { og_id: original.id },
    include: { host: true, likes: true },
  });
  const isCmts = Boolean(comments.length > 0);
  return res.json({ ok: isCmts, comments });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
