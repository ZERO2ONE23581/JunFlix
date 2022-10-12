import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.body;
  const { user } = req.session;
  const { user_id } = req.query;
  const isMatchQuery = Boolean(user?.id === +user_id);
  if (!user) return res.json({ ok: false, error: 'must login.' });
  if (!userId) return res.json({ ok: false, error: 'input missed.' });
  if (!user_id) return res.json({ ok: false, error: 'query missed.' });
  if (!isMatchQuery) return res.json({ ok: false, error: 'invalid query.' });
  //
  const User = await client.user.findUnique({
    where: { id: +user_id },
    select: { userId: true, id: true },
  });
  if (!User) return res.json({ ok: false, error: 'no user found.' });
  //
  const isHost = Boolean(User.userId === userId);
  if (!isHost) return res.json({ ok: false, error: 'userId not matched.' });
  //
  await client.user.delete({ where: { id: User.id } });
  req.session.destroy();
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
