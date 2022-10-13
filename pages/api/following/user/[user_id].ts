import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id } = req.query;
  if (!user) return res.json({ ok: false, error: 'must login.' });
  if (!user_id) return res.json({ ok: false, error: 'query missed.' });

  const found = await client.user.findUnique({
    where: { id: +user_id.toString() },
    select: { id: true },
  });
  if (!found) return res.json({ ok: false, error: 'no user found.' });

  //
  const isFollowing = Boolean(
    await client.following.findFirst({
      where: { host_id: user.id, user_id: found.id },
    })
  );
  if (!isFollowing) return res.json({ ok: false, isFollowing });
  return res.json({ ok: true, isFollowing });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
