import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../../../src/libs/server/withHandler';
import client from '../../../../../../src/libs/server/prisma_client';
import { withApiSession } from '../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id } = req.query;
  const { title, intro, genre, avatar } = req.body;
  if (!user)
    return res.json({ ok: false, error: '로그인이 필요한 기능입니다.' });
  if (!title)
    return res.json({ ok: false, error: '데이터가 미입력 되었습니다.' });
  if (user.id !== +user_id)
    return res.json({ ok: false, error: '유저불일치. 수정권한이 없습니다.' });
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
