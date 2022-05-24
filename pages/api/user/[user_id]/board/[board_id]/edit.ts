import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../../../src/libs/server/withHandler';
import client from '../../../../../../src/libs/server/prisma_client';
import { withApiSession } from '../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id, board_id } = req.query;
  const { Title, genre, intro } = req.body;

  //error handling
  if (!user) return res.json({ ok: false, error: 'MUST LOGIN!' });
  if (!board_id) return res.json({ ok: false, error: 'QUERY ERROR!' });
  if (!Title) return res.json({ ok: false, error: 'MUST DATA REQUIRED!' });
  if (user?.id !== +user_id)
    return res.json({ ok: false, error: 'UNAUTHORIZED!' });

  //Select board
  const foundBoard = await client.board.findUnique({
    where: { id: +board_id.toString() },
    select: { id: true, UserID: true, title: true },
  });
  if (!foundBoard) return res.json({ ok: false, error: 'NO BOARD FOUND!' });

  //중복된 제목 체크
  const dupTitle = Boolean(
    await client.board.findUnique({
      where: { title: Title },
    })
  );
  if (dupTitle && Title !== foundBoard.title)
    return res.json({ ok: false, error: '이미 사용중인 제목입니다.' });

  //Edit board
  await client.board.update({
    where: { id: foundBoard.id },
    data: { title: Title, genre, intro },
  });
  //
  return res.json({ ok: true, message: '보드가 수정되었습니다.' });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
