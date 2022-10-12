import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../../../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../../../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { content } = req.body;
  const { user_id, board_id, post_id, comment_id } = req.query;
  const queryExists = Boolean(user_id && board_id && post_id && comment_id);
  if (!user) return res.json({ ok: false, error: 'must login.' });
  if (!content) return res.json({ ok: false, error: 'input missed.!' });
  if (!queryExists) return res.json({ ok: false, error: 'QUERY ERROR!' });
  //
  const ParentComment = await client.comment.findUnique({
    where: { id: +comment_id },
  });

  if (ParentComment && ParentComment.ParentID !== 0) {
    await client.comment.create({
      data: {
        content,
        ReplyID: +comment_id,
        ParentID: ParentComment?.ParentID,
        user: { connect: { id: user?.id } },
        post: { connect: { id: +post_id.toString() } },
      },
    });
  } else {
    //첫번째 댓글
    await client.comment.create({
      data: {
        content,
        ReplyID: +comment_id,
        ParentID: +comment_id,
        user: { connect: { id: user?.id } },
        post: { connect: { id: +post_id.toString() } },
      },
    });
  }
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
