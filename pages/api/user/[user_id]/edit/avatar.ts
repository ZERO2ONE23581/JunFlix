import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id } = req.query;
  const { avatar } = req.body;
  //
  if (user?.id !== Number(user_id))
    return res.json({ ok: false, error: 'INVALID USERID QUERY' });
  const currentUser = await client.user.findUnique({
    where: { id: user.id },
  });
  if (!currentUser) return res.json({ ok: false, error: 'MUST LOGIN' });
  if (!avatar) return res.json({ ok: false, error: 'INPUT DATA REQUIRED' });

  //Update
  await client.user.update({
    where: { id: currentUser.id },
    data: { avatar },
  });
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
