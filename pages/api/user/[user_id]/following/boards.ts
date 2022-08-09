import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user_id } = req.query;
  const following = await client.following.findMany({
    where: { UserID: +user_id },
    include: { board: true, user: true },
  });
  const MyBoards = await client.board.findMany({
    where: { UserID: +user_id },
    select: { followers: true },
  });
  //
  return res.json({ ok: true, following, MyBoards });
}
export default withApiSession(withHandler({ methods: ['GET'], handler }));
