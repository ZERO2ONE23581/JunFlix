import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id, board_id } = req.query;
  const queryExists = Boolean(user_id && board_id);
  if (!user) return res.json({ ok: false, error: 'must login.' });
  if (!queryExists) return res.json({ ok: false, error: 'QUERY ERROR!' });

  //You can't follow your board
  if (user?.id === +user_id)
    return res.json({ ok: false, error: 'BOARD OWNER' });

  //Check my following data
  // const followingBoard = await client.following.findFirst({
  //   where: {
  //     UserID: user.id,
  //     BoardID: +board_id.toString(),
  //   },
  // });

  //Follow && Unfollow
  // if (followingBoard) {
  //   await client.following.delete({ where: { id: followingBoard.id } });
  // } else {
  //   await client.following.create({
  //     data: {
  //       user: { connect: { id: user?.id } },
  //       board: { connect: { id: +board_id.toString() } },
  //     },
  //   });
  // }
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
