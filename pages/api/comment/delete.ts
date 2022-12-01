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

  const target = await client.comment.findUnique({
    where: { id: +cmt_id.toString() },
  });
  if (!target) return res.json({ ok: false, error: 'no comment found' });

  const isPostMatch = Boolean(post.id === target.post_id);
  if (!isPostMatch) return res.json({ ok: false, error: 'invalid post' });

  //if replies
  if (target.og_id && target.id > target.reply_id) {
    const original = await client.comment.findUnique({
      where: { id: target.og_id },
    });
    if (!original)
      return res.json({ ok: false, error: 'no original comment found' });

    const replies = await client.comment.findMany({
      where: { og_id: original.id },
    });
    const filterd = replies.filter((cmt) => cmt.id >= target.id);
    filterd.map(
      async (target) =>
        await client.comment.delete({ where: { id: target.id } })
    );
    return res.json({ ok: true });
  }
  //if no replies
  const isDeleted = Boolean(
    await client.comment.delete({ where: { id: target.id } })
  );
  return res.json({ ok: isDeleted });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
