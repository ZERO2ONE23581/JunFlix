import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //1. 새로운 포스트 이미지를 올리는경우 (기존이미지를 대체) // Boolean(post_image) === true
  //2. 포스트 이미지에 변화 안주는 경우 // Boolean(post_image) === false
  //3. 포스트 이미지를 삭제하는 경우 // post_image === 'delete_og'

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

  const update = await client.post.update({
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
  });
  if (!update) return res.json({ ok: false, error: 'update failed' });
  return res.json({ ok: true, post: update });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
