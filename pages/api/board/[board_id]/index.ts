import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { board_id } = req.query;
  if (!board_id) return res.json({ ok: false, error: 'query missed.' });
  const board_Id = parseInt(board_id.toString());

  //
  const board = await client.board.findUnique({
    where: { id: board_Id },
    include: {
      host: true,
      posts: true,
      _count: true,
      followers: true,
    },
  });
  if (!board) return res.json({ ok: false, error: 'no board found.' });
  //
  return res.json({ ok: true, board });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
