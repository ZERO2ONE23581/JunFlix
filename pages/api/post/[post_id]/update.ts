import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const inputs = req.body;
  const { user } = req.session;
  const { post_id } = req.query;
  console.log(post_id, inputs);
  return;
  if (!user) return res.json({ ok: false, error: 'must login.' });
  if (!post_id) return res.json({ ok: false, error: 'query missed.' });

  //target post
  const target_post = await client.post.findUnique({
    where: { id: +post_id.toString() },
    select: { host_id: true, board_id: true, id: true },
  });
  if (!target_post) return res.json({ ok: false, error: 'no post found.' });
  if (!Boolean(target_post.host_id === user.id))
    return res.json({ ok: false, error: 'invalid host.' });

  //option1. skip update
  if (inputs.fetch_type === 'update_post_skip')
    return res.json({ ok: false, message: inputs.fetch_type });

  //option2. update board host only
  if (inputs.fetch_type === 'update_post') {
    const board_id = +inputs.board_id.toString();
    if (!board_id) return res.json({ ok: false, error: 'board_id missed.' });

    //find board
    const board = await client.board.findUnique({
      where: { id: board_id },
      select: { id: true, host_id: true },
    });

    //err handling
    if (!board) return res.json({ ok: false, error: 'no board found.' });
    if (!Boolean(board.host_id === user.id))
      return res.json({ ok: false, error: 'invalid board host.' });
    //update
    const isUpdate = Boolean(
      await client.post.update({
        where: { id: target_post.id },
        data: { board_id: board.id },
      })
    );
    if (!isUpdate) return res.json({ ok: false, error: 'update_post_fail.' });
    return res.json({ ok: isUpdate, message: inputs.fetch_type });
  }
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
