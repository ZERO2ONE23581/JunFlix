import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id } = req.query;
  const isMatchQuery = Boolean(user?.id === +user_id);
  const { name, birth, gender, location, username } = req.body;
  const inputs = { name, birth, gender, location, username };
  const isAny = Boolean(name || birth || gender || location || username);
  if (!user) return res.json({ ok: false, error: 'must_login' });
  if (!isAny) return res.json({ ok: false, error: 'miss_input' });
  if (!user_id) return res.json({ ok: false, error: 'query_missed' });
  if (!isMatchQuery) return res.json({ ok: false, error: 'invalid_query' });

  const target = await client.user.findUnique({
    where: { id: +user_id.toString() },
  });
  if (!target) return res.json({ ok: false, error: 'no_data' });

  const isMatch = Boolean(user?.id === target.id);
  if (!isMatch) return res.json({ ok: false, error: 'invalid_host' });

  const isUpdated = Boolean(
    await client.user.update({ where: { id: target.id }, data: inputs })
  );
  return res.json({ ok: isUpdated, msg: 'updated' });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
