import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id } = req.body;
  if (!user) return res.json({ ok: false, error: 'must login' });
  if (!user_id) return res.json({ ok: false, error: 'input missed' });

  //current user
  const target = await client.user.findUnique({
    where: { id: +user_id.toString() },
  });
  if (!target) return res.json({ ok: false, error: 'no user target.' });
  const isHost = Boolean(target.id === user.id);
  if (isHost) return res.json({ ok: false, error: 'you are the host' });

  //check if you are following this user
  const following = await client.following.findFirst({
    where: { host_id: user.id, user_id: target.id },
  });

  //if you are not following this user, create
  if (!following) {
    const following = await client.following.create({
      data: { host: { connect: { id: user.id } }, user_id: target.id },
    });
    await client.follower.create({
      data: {
        host_id: following.host_id,
        user: { connect: { id: following?.user_id! } },
      },
    });
    //
    return res.json({ ok: true, msg: 'user followed' });
  }

  //if you are following this user, delete
  if (following) {
    const follower = await client.follower.findFirst({
      where: { host_id: following.host_id, user_id: following.user_id },
    });
    if (!follower) return res.json({ ok: true, msg: 'no follower target.' });
    //
    await client.follower.delete({ where: { id: follower.id } });
    await client.following.delete({ where: { id: following.id } });
    return res.json({ ok: true, msg: 'user unfollowed' });
  }
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
