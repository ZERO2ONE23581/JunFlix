import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { comment_id } = req.query;
  if (!user) return res.json({ ok: false, error: 'must login.' });
  const comment = await client.comment.findUnique({
    where: { id: +comment_id.toString() },
    include: { _count: { select: { likes: true } } },
  });
  if (!comment) return res.json({ ok: false, error: 'no post found.' });

  const isLiked = Boolean(
    await client.like.findFirst({
      where: { host_id: user.id, comment_id: comment.id },
    })
  );
  return res.json({ ok: true, isLiked, num: comment._count.likes });
}
export default withApiSession(withHandler({ methods: ['GET'], handler }));
