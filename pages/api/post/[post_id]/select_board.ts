import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { board_id } = req.body;
  const { post_id } = req.query;
  if (!user) return res.json({ ok: false, error: 'must login.' });
  if (!post_id) return res.json({ ok: false, error: 'query missed.' });
  if (!board_id) return res.json({ ok: false, error: 'boar id missed.' });
  //
  const post = await client.post.findUnique({
    where: { id: +post_id.toString() },
    select: { host_id: true, board_id: true, id: true },
  });
  if (!post) return res.json({ ok: false, error: 'no post found.' });
  const isMyPost = Boolean(post.host_id === user.id);
  if (!isMyPost) return res.json({ ok: false, error: 'invalid host.' });

  const board = await client.board.findUnique({
    where: { id: board_id },
    select: { id: true, host_id: true },
  });
  if (!board) return res.json({ ok: false, error: 'no board found.' });
  const isMyBoard = Boolean(board.host_id === user.id);
  if (!isMyBoard) return res.json({ ok: false, error: 'invalid board host.' });
  //
  const isUpdate = Boolean(
    await client.post.update({
      where: { id: post.id },
      data: { board_id: board.id },
    })
  );
  if (!isUpdate) return res.json({ ok: false, error: 'fail.' });
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
