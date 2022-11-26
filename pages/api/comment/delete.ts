import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../src/libs/server/prisma_client';
import withHandler from '../../../src/libs/server/withHandler';
import { withApiSession } from '../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { post_id, cmt_id } = req.body;
  if (!user) return res.json({ ok: false, error: 'must login' });
  if (!Boolean(post_id && cmt_id))
    return res.json({ ok: false, error: 'input missed' });

  const post = await client.post.findUnique({
    where: { id: +post_id.toString() },
  });
  if (!post) return res.json({ ok: false, error: 'no post found' });

  const target_cmt = await client.comment.findUnique({
    where: { id: +cmt_id.toString() },
  });
  if (!target_cmt) return res.json({ ok: false, error: 'no comment found' });

  const isPostMatch = Boolean(post.id === target_cmt.post_id);
  if (!isPostMatch) return res.json({ ok: false, error: 'invalid post' });

  await client.comment.deleteMany({ where: { og_id: target_cmt.id } });
  await client.comment.deleteMany({ where: { reply_id: target_cmt.id } });
  const isDeleted = Boolean(
    await client.comment.delete({ where: { id: target_cmt.id } })
  );
  return res.json({ ok: isDeleted });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
