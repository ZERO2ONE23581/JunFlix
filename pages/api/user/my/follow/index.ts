import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  if (!user)
    return res.json({ ok: false, error: '로그인이 필요한 기능입니다.' });
  const following = await client.following.findMany({
    where: { UserID: user.id },
    select: { board: true },
  });
  const MyBoards = await client.board.findMany({
    where: { UserID: user.id },
    select: { followers: true },
  });
  //
  return res.json({ ok: true, following, MyBoards });
}
export default withApiSession(withHandler({ methods: ['GET'], handler }));
