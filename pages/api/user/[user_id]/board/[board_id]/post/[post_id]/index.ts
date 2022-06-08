import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../../../../../src/libs/server/withHandler';
import client from '../../../../../../../../src/libs/server/prisma_client';
import { withApiSession } from '../../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id, board_id, post_id } = req.query;
  const queryExists = Boolean(user_id && board_id && post_id);
  if (!queryExists) return res.json({ ok: false, error: 'QUERY ERROR' });
  //
  const post = await client.post.findUnique({
    where: { id: +post_id.toString() },
    include: {
      comments: {
        include: {
          user: { select: { id: true, username: true } },
        },
        orderBy: {
          id: 'desc',
        },
      },
      _count: { select: { likes: true, comments: true } },
    },
  });
  if (!post) return res.json({ ok: false, error: 'NO POST FOUND' });
  //
  const isLiked = Boolean(
    await client.likes.findFirst({
      where: { UserID: user?.id, PostID: post.id },
    })
  );
  const isComments = Boolean(
    await client.comment.findFirst({
      where: { UserID: user?.id, PostID: post.id },
    })
  );
  return res.json({ ok: true, post, isLiked, isComments });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
