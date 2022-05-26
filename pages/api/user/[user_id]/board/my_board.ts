import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id } = req.query;
  //error handling
  if (!user) return res.json({ ok: false, error: 'MUST LOGIN' });
  if (!user_id) return res.json({ ok: false, error: 'QUERY ERROR' });

  const myBoards = await client.board.findMany({
    where: { UserID: user.id },
    include: { user: true },
  });
  if (myBoards.length === 0)
    return res.json({ ok: false, error: 'NO BOARDS FOUND!' });
  //
  return res.json({ ok: true, myBoards });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler })
  //public can read any boards!
);
