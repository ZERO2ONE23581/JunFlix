import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id, board_id } = req.query;
  const isQuery = Boolean(user_id && board_id);
  const { title, genre, intro, avatar } = req.body;
  if (!user)
    return res.json({ ok: false, error: '로그인이 필요한 기능입니다.' });
  if (!isQuery) return res.json({ ok: false, error: 'QUERY ERROR!' });
  if (!title)
    return res.json({ ok: false, error: '데이터가 미입력 되었습니다.!' });
  if (user?.id !== +user_id)
    return res.json({ ok: false, error: '권한이 없습니다.' });
  const foundBoard = await client.board.findUnique({
    where: { id: +board_id.toString() },
    select: { id: true, UserID: true, title: true },
  });
  if (!foundBoard)
    return res.json({ ok: false, error: '보드가 존재하지 않습니다.' });
  const alreadyExists = Boolean(
    await client.board.findUnique({
      where: { title },
    })
  );
  if (alreadyExists && title !== foundBoard.title)
    return res.json({ ok: false, error: '이미 사용중인 제목입니다.' });
  await client.board.update({
    where: { id: foundBoard.id },
    data: { title, genre, intro, avatar },
  });
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
