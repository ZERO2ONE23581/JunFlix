import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../../../../../src/libs/server/withHandler';
import client from '../../../../../../../../src/libs/server/prisma_client';
import { withApiSession } from '../../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { avatar, title, content } = req.body;
  const { user_id, board_id, post_id } = req.query;
  const noQuery = !Boolean(board_id && post_id);
  //error handling
  if (!user) return res.json({ ok: false, error: 'MUST LOGIN!' });
  if (noQuery) return res.json({ ok: false, error: 'QUERY ERROR!' });
  if (!title) return res.json({ ok: false, error: 'INPUT DATA REQUIRED!' });
  if (user.id !== +user_id)
    return res.json({ ok: false, error: 'UNAUTHORIZED!' });

  //Edit the post -> with Valid user + board
  const foundPost = await client.post.findUnique({
    where: { id: +post_id.toString() },
    select: { id: true, UserID: true, BoardID: true, title: true },
  });
  if (!foundPost) return res.json({ ok: false, error: 'INVALID POST!' });
  if (foundPost.UserID !== +user_id)
    return res.json({ ok: false, error: 'INVALID USER!' });
  if (foundPost.BoardID !== +board_id)
    return res.json({ ok: false, error: 'INVALID BOARD!' });

  //Edit Post
  await client.post.update({
    where: { id: foundPost.id },
    data: { avatar, title, content },
  });
  //
  return res.json({ ok: true, message: '게시물이 수정되었습니다.' });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
