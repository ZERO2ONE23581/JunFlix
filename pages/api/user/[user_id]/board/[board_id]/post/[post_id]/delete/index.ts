import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { userId } = req.body;
  const { user_id, board_id, post_id } = req.query;
  const isOwner = Boolean(user?.id === +user_id);
  const isQuery = Boolean(user_id && board_id && post_id);
  if (!userId) return res.json({ ok: false, error: 'No input.' });
  if (!user) return res.json({ ok: false, error: 'login needed.' });
  if (!isQuery) return res.json({ ok: false, error: 'invalid url.' });
  if (!isOwner) return res.json({ ok: false, error: 'no rights to delete.' });
  //
  const FoundUser = await client.user.findUnique({
    where: { userId },
  });
  if (!FoundUser)
    return res.json({ ok: false, error: '존재하지 않는 아이디 입니다.' });
  if (FoundUser.id !== user.id)
    return res.json({ ok: false, error: '회원님의 아이디가 아닙니다.' });
  //
  const FoundPost = await client.post.findUnique({
    where: { id: +post_id.toString() },
    select: { id: true, UserID: true, BoardID: true },
  });
  if (!FoundPost) return res.json({ ok: false, error: 'INVALID POST!' });
  if (FoundPost.UserID !== FoundUser.id)
    return res.json({
      ok: false,
      error: '본인이 만든 게시물이 아닙니다. (삭제 권한이 없음)',
    });
  await client.post.delete({
    where: { id: FoundPost.id },
  });
  //
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
