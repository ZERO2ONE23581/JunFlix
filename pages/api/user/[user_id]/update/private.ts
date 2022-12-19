import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id } = req.query;
  if (!user) return res.json({ ok: false, error: 'must_login.' });
  if (!user_id) return res.json({ ok: false, error: 'query_miss' });

  const target = await client.user.findUnique({
    where: { id: +user_id.toString() },
  });
  if (!target) return res.json({ ok: false, error: 'no_data' });
  const isMatch = Boolean(user?.id === target.id);
  if (!isMatch) return res.json({ ok: false, error: 'invalid_host' });

  const isPrivate = target.onPrivate;
  if (isPrivate) {
    const isUpdated = Boolean(
      await client.user.update({
        where: { id: target.id },
        data: { onPrivate: false },
      })
    );
    return res.json({ ok: isUpdated });
  } else {
    const isUpdated = Boolean(
      await client.user.update({
        where: { id: target.id },
        data: { onPrivate: true },
      })
    );
    return res.json({ ok: isUpdated });
  }
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
