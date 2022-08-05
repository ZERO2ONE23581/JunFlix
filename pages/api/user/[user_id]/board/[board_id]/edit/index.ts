import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id, board_id } = req.query;
  const { title, genre, intro } = req.body;
  const isInput = Boolean(title);
  const isQuery = Boolean(user_id && board_id);
  const isOwner = Boolean(user?.id === +user_id);
  if (!user) return res.json({ ok: false, error: 'login needed.' });
  if (!isQuery) return res.json({ ok: false, error: 'invalid url.' });
  if (!isInput) return res.json({ ok: false, error: 'No input.' });
  if (!isOwner) return res.json({ ok: false, error: 'no rights to edit.' });

  const FoundBoard = await client.board.findUnique({
    where: { id: +board_id },
    select: { id: true, UserID: true, title: true },
  });
  if (!FoundBoard)
    return res.json({ ok: false, error: '보드가 존재하지 않습니다.' });

  if (title.toUpperCase() !== FoundBoard.title.toUpperCase()) {
    const alreadyExists = Boolean(
      await client.board.findUnique({
        where: { title },
      })
    );
    if (alreadyExists)
      return res.json({ ok: false, error: '이미 사용중인 제목입니다.' });
  }

  await client.board.update({
    where: { id: FoundBoard.id },
    data: { title, genre, intro },
  });
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
