import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { post_id } = req.query;
  if (!post_id) return res.json({ ok: false, error: 'post query id missed' });

  const post = await client.post.findUnique({
    where: { id: +post_id.toString() },
  });
  if (!post) return res.json({ ok: false, error: 'no post found' });

  const comments = await client.comment.findMany({
    include: { host: true, likes: true },
    where: { post_id: post.id },
  });
  const isCmts = Boolean(comments.length > 0);
  return res.json({ ok: isCmts, comments });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
