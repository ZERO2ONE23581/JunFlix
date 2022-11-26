import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../src/libs/server/prisma_client';
import withHandler from '../../../src/libs/server/withHandler';
import { withApiSession } from '../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { text, post_id, reply_id, og_id: comment_id } = req.body;
  if (!user) return res.json({ ok: false, error: 'must login' });
  const isInputs = Boolean(text && post_id && reply_id && comment_id);
  if (!isInputs) return res.json({ ok: false, error: 'input missed' });
  //
  const post = await client.post.findUnique({
    where: { id: +post_id.toString() },
  });
  if (!post) return res.json({ ok: false, error: 'no post found' });

  const og_comment = await client.comment.findUnique({
    where: { id: +comment_id.toString() },
  });
  if (!og_comment)
    return res.json({ ok: false, error: 'no original comment found' });

  const replied_comment = await client.comment.findUnique({
    where: { id: +reply_id.toString() },
  });
  if (!replied_comment)
    return res.json({ ok: false, error: 'no replied comment found' });

  const isPostMatch = Boolean(og_comment.post_id === post.id);
  if (!isPostMatch) return res.json({ ok: false, error: 'invalid post' });

  const isReplied = Boolean(
    await client.comment.create({
      data: {
        text,
        og_id: og_comment.id,
        reply_id: replied_comment.id,
        host: { connect: { id: user.id } },
        post: { connect: { id: post.id } },
      },
    })
  );
  return res.json({ ok: isReplied });
}
export default withApiSession(
  withHandler({ methods: ['POST'], handler, isPrivate: false })
);
