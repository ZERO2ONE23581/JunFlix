import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../src/libs/server/withHandler';
import prismaClient from '../../../../src/libs/server/prisma_client';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { board_id } = req.query;
  const data = req.body;

  //error handling
  if (!user) return res.json({ ok: false, error: 'LOGIN NEEDED' });
  if (!board_id) return res.json({ ok: false, error: 'URL ERROR' });

  //Select board
  const board = await prismaClient.board.findUnique({
    where: { id: +board_id.toString() },
  });
  //
  return res.json({ ok: true, board });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
