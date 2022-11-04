import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { post_id } = req.query;
  if (!post_id) return res.json({ ok: true, error: 'query missed.' });

  const post = await client.post.findUnique({
    where: { id: +post_id.toString() },
  });
  if (!post) return res.json({ ok: false, error: 'no post found.' });

  const likes = await client.like.findMany({
    where: { post_id: post.id },
    include: { host: true },
  });
  if (!likes) return res.json({ ok: false, error: 'GET failed' });
  return res.json({ ok: true, likes });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
