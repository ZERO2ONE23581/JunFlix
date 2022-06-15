import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id, board_id } = req.query;
  const queryExists = Boolean(user_id && board_id);
  if (!user)
    return res.json({ ok: false, error: '로그인이 필요한 기능입니다.' });
  if (!queryExists) return res.json({ ok: false, error: 'QUERY ERROR!' });

  //YOU CAN'T FOLLOW YOUR BOARD
  if (user?.id === +user_id)
    return res.json({ ok: false, error: 'BOARD OWNER' });

  //FIND FOLLOW
  const alreadyExists = await client.following.findFirst({
    where: {
      UserID: user.id,
      BoardID: +board_id.toString(),
    },
  });

  //UNFOLLOW AND FOLLOW
  if (alreadyExists) {
    await client.following.delete({ where: { id: alreadyExists.id } });
  } else {
    await client.following.create({
      data: {
        user: { connect: { id: user?.id } },
        board: { connect: { id: +board_id.toString() } },
      },
    });
  }
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
