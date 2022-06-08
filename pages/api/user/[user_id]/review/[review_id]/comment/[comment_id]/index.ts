import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user_id, review_id, comment_id } = req.query;
  const queryExists = Boolean(user_id && review_id);
  if (!queryExists) return res.json({ ok: false, error: 'QUERY ERROR!' });
  //
  const comment = await client.comment.findUnique({
    where: { id: +comment_id },
    include: { user: true },
  });
  //
  return res.json({ ok: true, comment });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
