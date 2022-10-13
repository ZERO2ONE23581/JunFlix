import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { board_id } = req.query;
  if (!user) return res.json({ ok: false, error: 'must login.' });
  if (!board_id) return res.json({ ok: false, error: 'query missed.' });

  const board = await client.board.findUnique({
    where: { id: +board_id.toString() },
    select: { id: true },
  });
  if (!board) return res.json({ ok: false, error: 'no board found.' });

  const isFollowing = Boolean(
    await client.following.findFirst({
      where: { host_id: user.id, board_id: board.id },
    })
  );
  //
  if (!isFollowing) return res.json({ ok: false, isFollowing });
  return res.json({ ok: true, isFollowing });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
