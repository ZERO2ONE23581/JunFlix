import { NextApiRequest, NextApiResponse } from 'next';
import prismaClient from '../../src/libs/server/prisma_client';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //
  if (req.method === 'GET') {
    const test = await prismaClient.user.create({
      data: {
        username: 'test name',
      },
    });
    return res.json({ ok: true, test });
  }
  //
  return;
}
export default handler;
