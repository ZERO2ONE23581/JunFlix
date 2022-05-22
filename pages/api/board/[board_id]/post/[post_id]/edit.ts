import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../../../src/libs/server/withHandler';
import prismaClient from '../../../../../../src/libs/server/prisma_client';
import { withApiSession } from '../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { board_id, post_id } = req.query;
  const { title, content } = req.body;
  const noInput = !Boolean(title && content);
  const noQuery = !Boolean(board_id && post_id);

  //error handling
  if (!user) return res.json({ ok: false, error: 'LOGIN NEEDED!' });
  if (noQuery) return res.json({ ok: false, error: 'QUERY ERROR!' });
  if (noInput) return res.json({ ok: false, error: 'NO INPUT DATA!' });

  //Select post
  const foundPost = await prismaClient.post.findUnique({
    where: { id: +post_id.toString() },
    select: { id: true, UserID: true, BoardID: true, title: true },
  });
  if (!foundPost) return res.json({ ok: false, error: 'NO POST FOUND!' });

  //UNAUTHORIZED
  if (foundPost?.UserID !== user?.id || foundPost.BoardID !== +board_id)
    return res.json({ ok: false, error: 'UNAUTHORIZED!' });

  //Edit Post
  await prismaClient.post.update({
    where: { id: foundPost.id },
    data: { title, content },
  });
  //
  return res.json({ ok: true, message: '게시물이 수정되었습니다.' });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
