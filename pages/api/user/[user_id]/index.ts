import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user_id } = req.query;
  if (!user_id) return res.json({ ok: false, error: 'query error' });
  //
  const user = await client.user.findUnique({
    where: { id: +user_id },
    include: { boards: true, posts: true, reviews: true },
  });
  //
  const follower = await client.following.findMany({
    where: {
      FollowingUserID: +user_id,
    },
    orderBy: {
      id: 'desc',
    },
  });
  const Followers = follower.filter((p) => !p.BoardID);

  const following = await client.following.findMany({
    where: {
      UserID: +user_id,
    },
    orderBy: {
      id: 'desc',
    },
  });
  const Followings = following.filter((p) => !p.BoardID);
  //
  return res.json({ ok: true, user, Followers, Followings });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
