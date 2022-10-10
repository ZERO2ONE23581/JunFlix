import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id, board_id, post_id } = req.query;
  const isOwner = Boolean(user?.id === +user_id);
  const isQuery = Boolean(user_id && board_id && post_id);
  if (!user) return res.json({ ok: false, error: 'login needed.' });
  if (!isQuery) return res.json({ ok: false, error: 'invalid url.' });
  if (!isOwner) return res.json({ ok: false, error: 'no rights to delete.' });

  const ThePost = await client.post.findUnique({
    where: { id: +post_id.toString() },
    select: { id: true, UserID: true, BoardID: true },
  });

  if (!ThePost)
    return res.json({ ok: false, error: '포스트가 존재하지 않습니다.' });
  if (ThePost.UserID !== user.id)
    return res.json({
      ok: false,
      error: '본인이 만든 게시물이 아닙니다. (삭제 권한이 없음)',
    });

  await client.post.delete({
    where: { id: ThePost.id },
  });
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
