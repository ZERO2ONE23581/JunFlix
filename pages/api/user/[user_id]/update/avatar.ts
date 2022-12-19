import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { avatar } = req.body;
  const { user } = req.session;
  const { user_id } = req.query;
  if (!user) return res.json({ ok: false, error: 'must login.' });
  if (!user_id) return res.json({ ok: false, error: 'query missed.' });
  //
  const target = await client.user.findUnique({
    where: { id: +user_id.toString() },
  });
  if (!target) return res.json({ ok: false, error: 'no user found.' });
  const isMatch = Boolean(user?.id === target.id);
  if (!isMatch) return res.json({ ok: false, error: 'user no matched.' });

  const isUpdated = Boolean(
    await client.user.update({ where: { id: target.id }, data: { avatar } })
  );
  return res.json({ ok: isUpdated, msg: 'updated' });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
