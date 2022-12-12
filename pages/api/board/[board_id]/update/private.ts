import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user_id } = req.body;
  const { user } = req.session;
  const { board_id } = req.query;
  const isMatch = Boolean(user?.id === user_id);
  if (!user) return res.json({ ok: false, error: 'must_login' });
  if (!isMatch) return res.json({ ok: false, error: 'id_unmatch' });
  if (!board_id) return res.json({ ok: false, error: 'miss_query' });

  const target = await client.board.findUnique({ where: { id: +board_id } });
  if (!target) return res.json({ ok: false, error: 'no_data' });
  const isHost = Boolean(target.host_id === user.id);
  if (!isHost) return res.json({ ok: false, error: 'invalid_host' });

  const where = { id: target.id };
  const isPrivate = target.onPrivate;
  const data = (onPrivate: boolean) => ({ onPrivate });
  if (isPrivate) {
    const isUpdated = Boolean(
      await client.board.update({ where, data: data(false) })
    );
    return res.json({ ok: isUpdated, msg: 'public' });
  } else {
    const isUpdated = Boolean(
      await client.board.update({ where, data: data(true) })
    );
    return res.json({ ok: isUpdated, msg: 'private' });
  }
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
