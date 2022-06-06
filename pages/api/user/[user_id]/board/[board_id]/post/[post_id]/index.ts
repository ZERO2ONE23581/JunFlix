import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../../../../../src/libs/server/withHandler';
import client from '../../../../../../../../src/libs/server/prisma_client';
import { withApiSession } from '../../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id, board_id, post_id } = req.query;
  const queryExists = Boolean(user_id && board_id && post_id);
  if (!queryExists) return res.json({ ok: false, error: 'QUERY ERROR!' });

  //FIND POST
  const post = await client.post.findUnique({
    where: { id: +post_id.toString() },
    include: {
      comments: {
        select: {
          id: true,
          UserID: true,
          ReplyID: true,
          content: true,
          user: { select: { id: true, username: true } },
          replies: true,
        },
        orderBy: {
          id: 'desc',
        },
      },
      _count: { select: { likes: true, comments: true } },
    },
  });
  if (!post) return res.json({ ok: false, error: 'NO POST FOUND!' });

  //로그인한 현재유저가 누른 포스트의 좋아요 + 댓글
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
  //
  return res.json({ ok: true, post, isLiked, isComments });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
