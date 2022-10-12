import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../src/libs/server/withHandler';
import { withApiSession } from '../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  if (!user) return res.json({ ok: false, error: 'must login.' });

  await req.session.destroy();
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
