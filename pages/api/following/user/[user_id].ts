import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id } = req.query;
  if (!user_id) return res.json({ ok: false, error: 'query missed.' });

  const target = await client.user.findUnique({
    where: { id: +user_id.toString() },
    include: { followers: true, followings: true },
  });
  if (!target) return res.json({ ok: false, error: 'no user target.' });

  const isFollowing = Boolean(
    await client.following.findFirst({
      where: { host_id: user?.id, user_id: target.id },
    })
  );
  const length = target.followers?.length!;
  if (!isFollowing) return res.json({ ok: false, length, isFollowing });
  return res.json({ ok: true, length, isFollowing });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
