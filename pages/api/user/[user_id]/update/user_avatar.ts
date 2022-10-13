import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { avatar } = req.body;
  const { user } = req.session;
  const { user_id } = req.query;
  const isMatchQuery = Boolean(user?.id !== +user_id);
  if (!user) return res.json({ ok: false, error: 'must login.' });
  if (!avatar) return res.json({ ok: false, error: 'input missed.' });
  if (!user_id) return res.json({ ok: false, error: 'query missed.' });
  if (!isMatchQuery) return res.json({ ok: false, error: 'invalid query.' });
  //
  await client.user.update({ where: { id: +user_id }, data: { avatar } });
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
