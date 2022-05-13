import { NextApiRequest, NextApiResponse } from 'next';
import prismaClient from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, password } = req.body;
  console.log(userId, password);

  return;
  //데이터 미입력 체크

  return res.json({ ok: true });
}
export default withHandler(['POST'], handler);
