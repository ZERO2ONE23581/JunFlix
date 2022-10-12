import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { board_id } = req.body;
  if (!user) return res.json({ ok: false, error: 'must login' });
  if (!board_id) return res.json({ ok: false, error: 'input missed' });

  const Board_ID = +board_id.toString();

  //current board
  const board = await client.board.findUnique({
    where: { id: Board_ID },
    select: { id: true, host_id: true },
  });
  if (!board) return res.json({ ok: false, error: 'no board found.' });
  const isHost = Boolean(board?.host_id === user.id);
  if (isHost) return res.json({ ok: false, error: 'you are the host' });

  //currently following boards
  const following = await client.following.findFirst({
    where: { host_id: user.id, board_id: board.id },
  });

  //create following
  if (!following) {
    const following = await client.following.create({
      data: { host: { connect: { id: user.id } }, board_id: board.id },
    });
    //create follower
    await client.follower.create({
      data: {
        host_id: following.host_id,
        board: { connect: { id: following?.board_id! } },
      },
    });
    return res.json({ ok: true, message: 'board followed' });
  }
  //delete following
  if (following) {
    await client.following.delete({ where: { id: following.id } });

    //delete follower
    const follower = await client.follower.findFirst({
      where: { host_id: following.host_id },
    });
    if (!follower) return res.json({ ok: true, message: 'no follower found.' });
    await client.follower.delete({ where: { id: follower.id } });
    //
    return res.json({ ok: true, message: 'board unfollowed' });
  }
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
