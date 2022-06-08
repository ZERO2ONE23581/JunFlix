import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id, board_id, post_id } = req.query;
  const queryExists = Boolean(user_id && board_id && post_id);
  if (!user) return res.json({ ok: false, error: 'MUST LOGIN!' });
  if (!queryExists) return res.json({ ok: false, error: 'QUERY ERROR!' });
  //
  const alreadyExists = await client.likes.findFirst({
    where: {
      UserID: user?.id,
      PostID: +post_id.toString(),
    },
  });
  //
  if (alreadyExists) {
    await client.likes.delete({ where: { id: alreadyExists.id } });
  } else {
    await client.likes.create({
      data: {
        user: { connect: { id: user?.id } },
        post: { connect: { id: +post_id.toString() } },
      },
    });
  }
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
