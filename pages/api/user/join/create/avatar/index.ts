import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { avatar, createdID } = req.body;
  const inputData = avatar && createdID;
  if (!inputData)
    return res.json({ ok: false, error: 'NO INPUT DATA REQUIRED' });
  //
  const user = await client.user.findUnique({
    where: { id: createdID },
  });
  if (!user) return res.json({ ok: false, error: 'NO USER FOUND.' });
  //
  await client.user.update({
    where: { id: user.id },
    data: { avatar },
  });
  return res.json({ ok: true });
}
export default withApiSession(
  withHandler({ methods: ['POST'], handler, isPrivate: false })
);
