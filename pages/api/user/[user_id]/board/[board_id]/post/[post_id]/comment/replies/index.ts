import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { user } = req.session;
    const { comment_id, content } = req.body;
    const { user_id, board_id, post_id } = req.query;
    const queryExists = Boolean(user_id && board_id && post_id);
    const inputData = Boolean(comment_id && content);
    if (!user) return res.json({ ok: false, error: 'MUST LOGIN!' });
    if (!queryExists) return res.json({ ok: false, error: 'QUERY ERROR!' });
    if (!inputData)
      return res.json({ ok: false, error: 'INPUT DATA REQUIRED!' });
    //
    const reply = await client.replies.create({
      data: {
        content,
        comment: { connect: { id: +comment_id } },
      },
    });
    await client.comments.create({
      data: {
        content,
        UserID: user.id,
        PostID: +post_id,
        ReplyID: reply.id,
      },
    });
    //
    return res.json({ ok: true });
  }
  if (req.method === 'GET') {
    const commentsWithReplies = await client.comments.findMany({
      select: { id: true, ReplyID: true, content: true, replies: true },
    });
    const replies = await client.replies.findMany();
    return res.json({ ok: true, commentsWithReplies, replies });
  }
}
export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler })
);
