import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id } = req.body;
  if (!user) return res.json({ ok: false, error: 'must login' });
  if (!user_id) return res.json({ ok: false, error: 'input missed' });

  const user_Id = parseInt(user_id.toString());

  //current user
  const found = await client.user.findUnique({
    where: { id: +user_id },
  });
  if (!found) return res.json({ ok: false, error: 'no user found.' });
  const isHost = Boolean(found.id === user.id);
  if (isHost) return res.json({ ok: false, error: 'you are the host' });

  //currently following users
  const following = await client.following.findFirst({
    where: { host_id: found.id, user_id: found.id },
  });

  //create following
  if (!following) {
    const following = await client.following.create({
      data: { host: { connect: { id: user.id } }, user_id: found.id },
    });
    //create follower (=== loggedin user)
    await client.follower.create({
      data: {
        host_id: following.host_id,
        user: { connect: { id: following?.user_id! } },
      },
    });
    return res.json({ ok: true, message: 'user followed' });
  }
  //delete following
  if (following) {
    await client.following.delete({ where: { id: following.id } });

    //delete follower
    const follower = await client.follower.findFirst({
      where: { host_id: following.host_id, user_id: following.user_id },
    });
    if (!follower) return res.json({ ok: true, message: 'no follower found.' });
    await client.follower.delete({ where: { id: follower.id } });
    //
    return res.json({ ok: true, message: 'user unfollowed' });
  }
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
