import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    title,
    hashtags,
    pageLink,
    board_id,
    onPrivate,
    post_image,
    description,
  } = req.body;
  const { user } = req.session;
  const { post_id } = req.query;
  if (!user) return res.json({ ok: false, error: 'must login.' });
  if (!post_id) return res.json({ ok: false, error: 'query missed.' });

  //target post
  const post = await client.post.findUnique({
    where: { id: +post_id.toString() },
  });
  if (!post) return res.json({ ok: false, error: 'no post found.' });
  if (!Boolean(post.host_id === user.id))
    return res.json({ ok: false, error: 'invalid host.' });

  const isUpdate = Boolean(
    await client.post.update({
      where: { id: post.id },
      data: {
        title,
        onPrivate,
        board_id,
        hashtags,
        pageLink,
        post_image,
        description,
      },
    })
  );
  if (!isUpdate) return res.json({ ok: false, error: 'update failed' });
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
