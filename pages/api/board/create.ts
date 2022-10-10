import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../src/libs/server/prisma_client';
import withHandler from '../../../src/libs/server/withHandler';
import { withApiSession } from '../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id } = req.query;
  const userMatch = Boolean(user?.id === +user_id);
  const { title, description, genre, avatar } = req.body;
  if (!user) return res.json({ ok: false, error: 'must login.' });
  if (!title) return res.json({ ok: false, error: 'input missed.' });
  if (!userMatch) return res.json({ ok: false, error: 'invalid user.' });
  //
  const dupData = Boolean(
    await client.board.findUnique({
      where: { title },
    })
  );
  if (dupData)
    return res.json({ ok: false, error: '이미 사용중인 제목입니다.' });
  //
  const board = await client.board.create({
    data: {
      title,
      description,
      genre,
      avatar,
      user: { connect: { id: user.id } },
    },
    select: {
      id: true,
      UserID: true,
      title: true,
    },
  });
  //
  return res.json({ ok: true, board });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
