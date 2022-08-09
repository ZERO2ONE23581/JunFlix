import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user_id } = req.query;
  const User = await client.user.findUnique({
    where: { id: +user_id },
  });
  //
  return res.json({ ok: true, User });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
