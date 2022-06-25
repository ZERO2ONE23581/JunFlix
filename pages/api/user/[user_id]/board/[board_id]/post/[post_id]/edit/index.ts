import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { avatar, title, content } = req.body;
  const { user_id, board_id, post_id } = req.query;
  const isQuery = Boolean(board_id && post_id && post_id);
  if (!user)
    return res.json({ ok: false, error: '로그인이 필요한 기능입니다.' });
  if (!isQuery) return res.json({ ok: false, error: 'QUERY ERROR!' });
  if (!title)
    return res.json({ ok: false, error: '데이터가 미입력 되었습니다.!' });
  if (user.id !== +user_id)
    return res.json({ ok: false, error: '유저 불일치. 수정권한이 없습니다.' });

  const foundPost = await client.post.findUnique({
    where: { id: +post_id.toString() },
    select: { id: true, UserID: true, BoardID: true, title: true },
  });
  if (!foundPost)
    return res.json({ ok: false, error: '포스트가 존재하지 않습니다.' });
  if (foundPost.UserID !== user.id)
    return res.json({ ok: false, error: '유저 불일치. 수정권한이 없습니다.' });
  if (foundPost.BoardID !== +board_id)
    return res.json({
      ok: false,
      error: '보드 불일치. 주소를 다시 확인하세요.',
    });

  await client.post.update({
    where: { id: foundPost.id },
    data: { avatar, title, content },
  });
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
