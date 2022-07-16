import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id, review_id } = req.query;
  const queryExists = Boolean(user_id && review_id);
  if (!queryExists) return res.json({ ok: false, error: 'QUERY ERROR!' });
  //
  const review = await client.review.findUnique({
    where: { id: +review_id.toString() },
    include: {
      user: {
        select: { id: true, username: true, avatar: true, userId: true },
      },
      comments: {
        include: {
          user: {
            select: { id: true, username: true, avatar: true, userId: true },
          },
        },
        orderBy: {
          id: 'desc',
        },
      },
      _count: { select: { likes: true, comments: true } },
    },
  });
  if (!review) return res.json({ ok: false, error: 'NO REVIEW FOUND' });
  //
  const isLiked = Boolean(
    await client.likes.findFirst({
      where: { UserID: user?.id, ReviewID: review.id },
    })
  );
  const isComments = Boolean(
    await client.comment.findFirst({
      where: { UserID: user?.id, ReviewID: review.id },
    })
  );
  return res.json({ ok: true, review, isLiked, isComments });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
