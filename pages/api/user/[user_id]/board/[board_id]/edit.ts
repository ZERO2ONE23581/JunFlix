import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../../../src/libs/server/withHandler';
import prismaClient from '../../../../../../src/libs/server/prisma_client';
import { withApiSession } from '../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id, board_id } = req.query;
  const { titleCap, genre, intro } = req.body;

  //error handling
  if (!user) return res.json({ ok: false, error: 'MUST LOGIN!' });
  if (!board_id) return res.json({ ok: false, error: 'QUERY ERROR!' });
  if (!titleCap) return res.json({ ok: false, error: 'NO INPUT DATA!' });
  if (user?.id !== +user_id)
    return res.json({ ok: false, error: 'NO RIGHTS!' });

  //Select board
  const foundBoard = await prismaClient.board.findUnique({
    where: { id: +board_id.toString() },
    select: { id: true, UserID: true, title: true },
  });
  if (!foundBoard) return res.json({ ok: false, error: 'NO BOARD FOUND!' });

  //중복된 제목 체크
  const dupTitle = Boolean(
    await prismaClient.board.findUnique({
      where: { title: titleCap },
    })
  );
  if (dupTitle && titleCap !== foundBoard.title)
    return res.json({ ok: false, error: '이미 사용중인 제목입니다.' });

  //Edit board
  await prismaClient.board.update({
    where: { id: foundBoard.id },
    data: { title: titleCap, genre, intro },
  });
  //
  return res.json({ ok: true, message: '보드가 수정되었습니다.' });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
