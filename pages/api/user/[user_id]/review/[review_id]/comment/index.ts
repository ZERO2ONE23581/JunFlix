import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user_id, review_id } = req.query;
  const queryExists = Boolean(user_id && review_id);
  if (!queryExists) return res.json({ ok: false, error: 'QUERY ERROR!' });
  //
  const allComments = await client.comment.findMany({
    where: { ReviewID: +review_id },
    include: { user: { select: { id: true, username: true, avatar: true } } },
    orderBy: {
      id: 'desc',
    },
  });
  if (allComments.length === 0)
    return res.json({ ok: false, error: 'NO COMMENTS FOUND' });
  //
  return res.json({ ok: true, allComments });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
