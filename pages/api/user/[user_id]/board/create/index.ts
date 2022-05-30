import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../../../src/libs/server/withHandler';
import client from '../../../../../../src/libs/server/prisma_client';
import { withApiSession } from '../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id } = req.query;
  const { title, intro, genre } = req.body;
  if (!user) return res.json({ ok: false, error: 'MUST LOGIN' });
  if (!title) return res.json({ ok: false, error: 'INPUT DATA REQUIRED' });
  if (user.id !== +user_id)
    return res.json({ ok: false, error: 'QUERY ERROR!' });
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
      intro,
      genre,
      user: { connect: { id: user.id } },
    },
  });
  //
  return res.json({ ok: true, board });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));