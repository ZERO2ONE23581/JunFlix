import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../../../../../src/libs/server/withHandler';
import client from '../../../../../../../../src/libs/server/prisma_client';
import { withApiSession } from '../../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { board_id } = req.query;
  const { avatar } = req.body;
  if (!user)
    return res.json({ ok: false, error: '로그인이 필요한 기능입니다.' });
  if (!board_id) return res.json({ ok: false, error: 'QUERY ERROR!' });
  if (!avatar) return res.json({ ok: false, error: 'INPUT DATA REQUIRED!' });
  //
  const foundBoard = await client.board.findUnique({
    where: { id: +board_id.toString() },
    select: { id: true, avatar: true },
  });
  if (!foundBoard) return res.json({ ok: false, error: 'NO BOARD FOUND!' });
  //
  await client.board.update({
    where: { id: foundBoard.id },
    data: { avatar },
  });
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
