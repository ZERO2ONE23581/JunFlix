import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../../../../../src/libs/server/withHandler';
import prismaClient from '../../../../../../../../src/libs/server/prisma_client';
import { withApiSession } from '../../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const delConfirm = req.body;
  const { board_id, post_id } = req.query;
  const noQuery = !Boolean(board_id && post_id);

  //error handling
  if (!user) return res.json({ ok: false, error: 'LOGIN NEEDED!' });
  if (noQuery) return res.json({ ok: false, error: 'QUERY ERROR!' });
  if (!delConfirm) return res.json({ ok: false, error: 'DELETE UNCONFIRMED!' });
  //
  const foundPost = await prismaClient.post.findUnique({
    where: { id: +post_id.toString() },
    select: { id: true, UserID: true, BoardID: true },
  });
  if (!foundPost) return res.json({ ok: false, error: 'INVALID POST!' });
  if (foundPost?.UserID !== user?.id || foundPost.BoardID !== +board_id)
    return res.json({ ok: false, error: 'NO RIGHTS TO DELETE THIS POST!' });
  //
  await prismaClient.post.delete({
    where: { id: foundPost.id },
  });
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
