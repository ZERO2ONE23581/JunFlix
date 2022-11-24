import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { post_id, host_id } = req.query;
  const isQuery = Boolean(post_id && host_id);
  if (!isQuery) return res.json({ ok: false, error: 'input missed' });
  const host = await client.user.findUnique({
    where: { id: +host_id.toString() },
  });
  if (!host) return res.json({ ok: false, error: 'no host found' });
  const post = await client.comment.findUnique({
    where: { id: +post_id.toString() },
  });

  if (!post) return res.json({ ok: false, error: 'no post found' });
  const isValidPost = Boolean(post.host_id === host.id);
  if (!isValidPost) return res.json({ ok: false, error: 'invalid post' });

  const comments = await client.comment.findMany({
    include: { host: true },
    where: { post_id: post.id, host_id: host.id },
  });
  const isCmts = Boolean(comments.length > 0);
  return res.json({ ok: isCmts, comments });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
