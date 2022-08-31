import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id } = req.query;
  if (!user_id) return res.json({ ok: false, error: 'query error' });
  if (!user) return res.json({ ok: false, error: 'need to login' });

  if (req.method === 'POST') {
    //You can't follow yourself
    if (user?.id === +user_id)
      return res.json({ ok: false, error: 'You are the host' });

    //Check my following data
    const followingUser = await client.following.findFirst({
      where: {
        UserID: user.id,
        FollowingUserID: +user_id,
      },
    });

    //Follow && Unfollow
    if (followingUser)
      await client.following.delete({ where: { id: followingUser.id } });

    if (!followingUser) {
      await client.following.create({
        data: {
          user: { connect: { id: user?.id } },
          FollowingUserID: +user_id,
        },
      });
    }
    return res.json({ ok: true, isFollowing: Boolean(followingUser) });
  }
  if (req.method === 'GET') {
    const following = await client.following.findMany({
      where: {
        UserID: +user_id,
      },
    });
    const FollowingUsers = following.filter((p) => !p.BoardID);
    const followed = await client.following.findMany({
      where: {
        FollowingUserID: +user_id,
      },
    });
    const Followers = followed.filter((p) => !p.BoardID);
    const isFollowing = Boolean(
      await client.following.findFirst({
        where: {
          UserID: user.id,
          FollowingUserID: +user_id,
        },
      })
    );
    return res.json({
      ok: true,
      Followers,
      isFollowing,
      FollowingUsers,
    });
  }
}

export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler })
);
