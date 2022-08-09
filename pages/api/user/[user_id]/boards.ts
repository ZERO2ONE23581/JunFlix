import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user_id } = req.query;
  const boards = await client.board.findMany({
    where: { UserID: +user_id },
    include: { user: true, followers: { select: { user: true } } },
    orderBy: {
      id: 'desc',
    },
  });
  if (boards.length === 0)
    return res.json({ ok: false, error: 'No Board exists' });
  return res.json({ ok: true, boards });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
