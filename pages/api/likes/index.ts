import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../src/libs/server/prisma_client';
import withHandler from '../../../src/libs/server/withHandler';
import { withApiSession } from '../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user_id } = req.query;
  const MyLikes = await client.like.findMany({
    where: { host_id: +user_id },
    select: {
      id: true,
      post: {
        include: { host: true, board: true, _count: true },
      },
      review: {
        include: { host: true, _count: true },
      },
    },
    orderBy: {
      id: 'desc',
    },
  });
  const MyPostLikes = MyLikes.map((like) => like?.post).filter(
    (post) => post !== null
  );
  const MyReviewLikes = MyLikes.map((like) => like?.review).filter(
    (review) => review !== null
  );
  //
  return res.json({ ok: true, MyPostLikes, MyReviewLikes });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
