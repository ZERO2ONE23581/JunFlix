import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { comment_id, newComments } = req.body;
  const { user_id, board_id, post_id } = req.query;
  const mustData = Boolean(comment_id && newComments);
  const queryExists = Boolean(user_id && board_id && post_id);
  if (!user) return res.json({ ok: false, error: 'MUST LOGIN!' });
  if (!mustData) return res.json({ ok: false, error: 'INPUT DATA REQUIRED!' });
  if (!queryExists) return res.json({ ok: false, error: 'QUERY ERROR!' });
  //
  const newComment = await client.comments.update({
    where: { id: +comment_id },
    data: { content: newComments },
  });
  //
  return res.json({ ok: true, newComment });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
