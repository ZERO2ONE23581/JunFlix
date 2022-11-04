import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { post_id } = req.query;
  if (!user) return res.json({ ok: false, error: 'must login.' });
  if (!post_id) return res.json({ ok: true, error: 'query missed.' });

  const post = await client.post.findUnique({
    where: { id: +post_id.toString() },
    include: { _count: { select: { likes: true } } },
  });
  if (!post) return res.json({ ok: false, error: 'no post found.' });

  const isLiked = Boolean(
    await client.like.findFirst({
      where: { host_id: user.id, post_id: post.id },
    })
  );
  return res.json({ ok: isLiked, num: post._count.likes });
}
export default withApiSession(withHandler({ methods: ['GET'], handler }));
