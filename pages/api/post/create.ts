import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../src/libs/server/prisma_client';
import withHandler from '../../../src/libs/server/withHandler';
import { withApiSession } from '../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  if (!user) return res.json({ ok: false, error: 'must login.' });
  const { host_id, post_image, title, description, pageLink, hashtags } =
    req.body;
  const isMeHost = Boolean(host_id === user.id);
  if (!isMeHost) return res.json({ ok: false, error: 'invalid host.' });
  if (!host_id) return res.json({ ok: false, error: 'host id missed.' });
  if (!title) return res.json({ ok: false, error: 'title input missed.' });
  const must = {
    title,
    pageLink,
    hashtags,
    post_image,
    description,
    host: { connect: { id: host_id } },
  };
  //
  const post = await client.post.create({
    data: { ...must },
    select: { id: true },
  });
  if (!post) return res.json({ ok: false, error: 'Failed' });
  return res.json({ ok: true, post_id: post.id });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
