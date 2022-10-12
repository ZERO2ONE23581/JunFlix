import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../src/libs/server/prisma_client';
import withHandler from '../../../src/libs/server/withHandler';
import { withApiSession } from '../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { board_Id } = req.body;
  if (!user) return res.json({ ok: false, error: 'must login' });
  if (!board_Id) return res.json({ ok: false, error: 'inputs missed' });
}
export default withApiSession(withHandler({ methods: ['GET'], handler }));
