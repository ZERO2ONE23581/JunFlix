import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const inputs = req.body;
  const { user } = req.session;
  const { board_id } = req.query; //현보드 아이디
  const isMatch = Boolean(user?.id === +inputs.user_id);
  if (!user) return res.json({ ok: false, error: 'must login.' });
  if (!inputs) return res.json({ ok: false, error: 'input missed.' });
  if (!board_id) return res.json({ ok: false, error: 'query missed.' });
  if (!isMatch) return res.json({ ok: false, error: 'invalid user.' });
  //
  const givenUser = await client.user.findUnique({
    where: { userId: inputs.userId },
  });
  if (!givenUser)
    return res.json({
      ok: false,
      error: '아이디가 존재하지 않습니다. (no ID found)',
    });
  if (givenUser.id !== user.id)
    return res.json({
      ok: false,
      error: '아이디가 일치하지 않습니다. (invalid ID)',
    });
  //
  const board = await client.board.findUnique({
    where: { id: +board_id },
    include: { host: { select: { userId: true } } },
  });
  if (!board)
    return res.json({
      ok: false,
      error: '보드를 찾을수 없습니다. (no board found)',
    });
  const isMyBoard = Boolean(board.host.userId === inputs.userId.toUpperCase());
  if (!isMyBoard)
    return res.json({
      ok: false,
      error: '이 보드의 호스트가 아닙니다. (invalid board host)',
    });
  //
  await client.board.delete({
    where: { id: board.id },
  });
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
