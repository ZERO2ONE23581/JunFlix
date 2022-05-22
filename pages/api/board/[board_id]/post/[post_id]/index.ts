import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../../../src/libs/server/withHandler';
import prismaClient from '../../../../../../src/libs/server/prisma_client';
import { withApiSession } from '../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { board_id, post_id } = req.query;

  //error handling
  if (!user) return res.json({ ok: false, error: 'LOGIN NEEDED' });
  if (!Boolean(board_id && post_id))
    return res.json({ ok: false, error: 'QUERY ERROR!' });

  //Select board
  const post = await prismaClient.post.findUnique({
    where: { id: +post_id.toString() },
  });
  if (+board_id !== post?.BoardID)
    return res.json({ ok: false, error: 'UNVALID BOARD ID!' });
  //
  return res.json({ ok: true, post });
}
export default withApiSession(withHandler({ methods: ['GET'], handler }));
