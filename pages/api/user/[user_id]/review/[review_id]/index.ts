import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id, review_id } = req.query;
  const queryExists = Boolean(user_id && review_id);
  if (!user)
    return res.json({ ok: false, error: '로그인이 필요한 기능입니다.' });
  if (!queryExists) return res.json({ ok: false, error: 'QUERY ERROR!' });
  //
  const review = await client.review.findUnique({
    where: { id: +review_id.toString() },
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
export default withApiSession(withHandler({ methods: ['GET'], handler }));
