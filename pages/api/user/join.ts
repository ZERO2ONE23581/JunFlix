import { NextApiRequest, NextApiResponse } from 'next';
import prismaClient from '../../../src/libs/server/prisma_client';
import withHandler from '../../../src/libs/server/withHandler';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //
  const data = req.body;
  console.log(data);

  //
  return;
}
export default withHandler(['GET', 'POST'], handler);
