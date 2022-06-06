import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const comment_id = req.body;
  const { user_id, board_id, post_id } = req.query;
  const queryExists = Boolean(user_id && board_id && post_id);
  if (!user) return res.json({ ok: false, error: 'MUST LOGIN!' });
  if (!comment_id)
    return res.json({ ok: false, error: 'INPUT DATA REQUIRED!' });
  if (!queryExists) return res.json({ ok: false, error: 'QUERY ERROR!' });
  //
  const foundComment = await client.comments.findUnique({
    where: { id: +comment_id },
  });
  if (!foundComment) return res.json({ ok: false, error: 'NO COMMENT FOUND' });
  if (foundComment.UserID !== user.id)
    return res.json({ ok: false, error: 'INVALID USER' });
  //
  await client.comments.delete({
    where: { id: foundComment.id },
  });
  //
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
