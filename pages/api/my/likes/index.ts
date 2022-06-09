import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  if (!user) return res.json({ ok: false, error: 'MUST LOGIN' });
  //
  const AllLikes = await client.likes.findMany({
    where: { UserID: user.id },
    select: {
      id: true,
      post: { select: { id: true, UserID: true, BoardID: true, avatar: true } },
      review: {
        select: {
          id: true,
          UserID: true,
          avatar: true,
          score: true,
          user: { select: { username: true, avatar: true } },
        },
      },
    },
    orderBy: {
      id: 'desc',
    },
  });
  const postlikes = AllLikes.filter((like) => like?.post !== null);
  const reviewLikes = AllLikes.filter((like) => like?.review !== null);
  //
  return res.json({ ok: true, postlikes, reviewLikes });
}
export default withApiSession(withHandler({ methods: ['GET'], handler }));
