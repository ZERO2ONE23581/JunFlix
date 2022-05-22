import { NextApiRequest, NextApiResponse } from 'next';
import prismaClient from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { user } = req.session;
  if (!user) return res.json({ ok: false, error: 'MUST LOGIN!' });
  await req.session.destroy();
  return res.redirect('/login');
}
export default withApiSession(withHandler({ methods: ['GET'], handler }));
