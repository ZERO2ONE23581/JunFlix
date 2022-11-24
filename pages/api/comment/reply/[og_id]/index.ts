import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { og_id } = req.query;
  const { user } = req.session;
  const { text, post_id, reply_id } = req.body;

  if (!user) return res.json({ ok: false, error: 'must login' });
  if (!Boolean(text && post_id))
    return res.json({ ok: false, error: 'input missed' });

  const original = await client.comment.findUnique({
    where: { id: +og_id.toString() },
  });
  if (!original)
    return res.json({ ok: false, error: 'no original comment found' });

  const reply = await client.comment.findUnique({
    where: { id: +reply_id.toString() },
  });
  if (!reply) return res.json({ ok: false, error: 'no reply found' });

  const post = await client.post.findUnique({
    where: { id: +post_id.toString() },
  });
  if (!post) return res.json({ ok: false, error: 'no post found' });

  const isPostMatch = Boolean(
    original.post_id === post.id && reply.post_id === post.id
  );
  const isHostMatch = Boolean(
    original.host_id === user.id && reply.host_id === user.id
  );
  if (!isPostMatch) return res.json({ ok: false, error: 'invalid post' });
  if (!isHostMatch) return res.json({ ok: false, error: 'invalid host' });

  const isCreated = Boolean(
    await client.comment.create({
      data: {
        text,
        og_id: original.id,
        reply_id: reply.id,
        host: { connect: { id: user.id } },
        post: { connect: { id: post.id } },
      },
    })
  );
  return res.json({ ok: isCreated });
}
export default withApiSession(
  withHandler({ methods: ['POST'], handler, isPrivate: false })
);
