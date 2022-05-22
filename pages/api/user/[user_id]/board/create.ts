import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../../src/libs/server/withHandler';
import prismaClient from '../../../../../src/libs/server/prisma_client';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id } = req.query;
  const { title, intro, genre } = req.body;
  //
  if (!user) return res.json({ ok: false, error: 'LOGIN NEEDED' });
  if (!title) return res.json({ ok: false, error: 'NO INPUT DATA' });
  if (user.id !== +user_id) return res.json({ ok: false, error: 'NO RIGHTS!' });
  //
  const dupData = Boolean(
    await prismaClient.board.findUnique({
      where: { title },
    })
  );
  if (dupData)
    return res.json({ ok: false, error: '이미 쓰고있는 제목입니다.' });
  //
  const newBoard = await prismaClient.board.create({
    data: {
      title,
      intro,
      genre,
      user: { connect: { id: user.id } },
    },
    select: { id: true, user: true, title: true },
  });
  const boardId = newBoard.id;
  const boardTitle = newBoard.title;
  const creatorId = newBoard.user.id;
  //
  return res.json({ ok: true, boardId, boardTitle, creatorId });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
