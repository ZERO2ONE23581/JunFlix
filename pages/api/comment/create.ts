import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../src/libs/server/prisma_client';
import withHandler from '../../../src/libs/server/withHandler';
import { withApiSession } from '../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { text, post_id } = req.body;
  if (!user) return res.json({ ok: false, error: 'must login' });
  if (!Boolean(text && post_id))
    return res.json({ ok: false, error: 'input missed' });
  const post = await client.post.findUnique({
    where: { id: +post_id.toString() },
  });

  if (!post) return res.json({ ok: false, error: 'no post found' });

  const isCreated = Boolean(
    await client.comment.create({
      data: {
        text,
        host: { connect: { id: user.id } },
        post: { connect: { id: post.id } },
      },
    })
  );
  return res.json({ ok: isCreated });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
