import { NextApiRequest, NextApiResponse } from 'next';
import prismaClient from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const data = req.body;
  console.log(data);
  //
  return res.json({ ok: true });
}

export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler, isPrivate: false })
);
