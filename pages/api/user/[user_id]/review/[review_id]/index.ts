import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id, review_id } = req.query;
  const queryExists = Boolean(user_id && review_id);
  if (!user) return res.json({ ok: false, error: 'MUST LOGIN!' });
  if (!queryExists) return res.json({ ok: false, error: 'QUERY ERROR!' });

  const review = await client.review.findUnique({
    where: { id: +review_id.toString() },
    include: {
      user: { select: { username: true } },
      _count: { select: { likes: true } },
    },
  });
  //ERROR HANDLING
  if (!review) return res.json({ ok: false, error: 'NO REVIEW FOUND!' });
  if (review?.UserID !== +user_id.toString())
    return res.json({ ok: false, error: 'INVALID USER!' });

  //FIND LIKES (로그인한 현재유저가 누른 리뷰의 좋아요)
  const isLiked = Boolean(
    await client.likes.findFirst({
      where: { UserID: user?.id, ReviewID: review.id },
    })
  );
  //
  return res.json({ ok: true, review, isLiked });
}
export default withApiSession(withHandler({ methods: ['GET'], handler }));
