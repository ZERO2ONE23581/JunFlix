import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../src/libs/server/withHandler';
import prismaClient from '../../../../src/libs/server/prisma_client';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { board_id } = req.query;
  const { titleCap, genre, intro } = req.body;
  const noInput = !Boolean(titleCap && genre && intro);

  //error handling
  if (!user) return res.json({ ok: false, error: 'LOGIN NEEDED!' });
  if (!board_id) return res.json({ ok: false, error: 'URL ERROR!' });
  if (noInput) return res.json({ ok: false, error: 'NO INPUT DATA!' });

  //Select board
  const foundBoard = await prismaClient.board.findUnique({
    where: { id: +board_id.toString() },
    select: { id: true, UserID: true, title: true },
  });
  if (!foundBoard) return res.json({ ok: false, error: 'NO BOARD FOUND!' });

  //Only creator can edit his board!
  if (foundBoard?.UserID !== user?.id)
    return res.json({ ok: false, error: '보드의 작성자가 아닙니다.' });

  //중복된 제목 체크
  const dupTitle = Boolean(
    await prismaClient.board.findUnique({
      where: { title: titleCap },
    })
  );
  console.log('titleCap==', titleCap);
  console.log('foundBoard.title==', foundBoard.title);
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
