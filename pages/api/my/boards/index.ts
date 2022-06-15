import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  if (!user)
    return res.json({ ok: false, error: '로그인이 필요한 기능입니다.' });
  //
  const boards = await client.board.findMany({
    where: { UserID: user.id },
    include: { user: true, followers: { select: { user: true } } },
    orderBy: {
      id: 'desc',
    },
  });
  if (boards.length === 0)
    return res.json({ ok: false, error: 'NO BOARDS FOUND!' });
  //
  return res.json({ ok: true, boards });
}
export default withApiSession(withHandler({ methods: ['GET'], handler }));
