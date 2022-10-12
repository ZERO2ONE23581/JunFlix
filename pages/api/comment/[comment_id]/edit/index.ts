import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../../../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../../../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { content } = req.body;
  const { user_id, board_id, post_id, comment_id } = req.query;
  const queryExists = Boolean(user_id && board_id && post_id);
  if (!user) return res.json({ ok: false, error: 'must login.' });
  if (!content) return res.json({ ok: false, error: 'input missed.!' });
  if (!queryExists) return res.json({ ok: false, error: 'QUERY ERROR!' });
  //
  const foundComment = await client.comment.findUnique({
    where: { id: +comment_id },
  });
  if (!foundComment) return res.json({ ok: false, error: 'NO COMMENT FOUND' });
  //
  await client.comment.update({
    where: { id: foundComment.id },
    data: { content },
  });
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
