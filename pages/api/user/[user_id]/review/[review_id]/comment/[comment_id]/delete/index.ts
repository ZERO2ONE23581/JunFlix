import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id, review_id, comment_id } = req.query;
  const queryExists = Boolean(user_id && review_id && comment_id);
  if (!user)
    return res.json({ ok: false, error: '로그인이 필요한 기능입니다.' });
  if (!queryExists) return res.json({ ok: false, error: 'QUERY ERROR!' });
  //
  const FoundComment = await client.comment.findUnique({
    where: { id: +comment_id },
  });
  if (!FoundComment) return res.json({ ok: false, error: 'NO COMMENT FOUND' });
  await client.comment.delete({
    where: { id: FoundComment.id },
  });
  //
  const FoundReply = await client.comment.findMany({
    where: { ReplyID: FoundComment.id },
  });
  if (FoundReply) {
    await client.comment.deleteMany({
      where: { ReplyID: FoundComment.id },
    });
  }
  const Reply = await client.comment.findMany({
    where: { ReplyID: FoundComment.id },
  });
  if (Reply) {
    await client.comment.deleteMany({
      where: { ReplyID: FoundComment.id },
    });
  }
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
