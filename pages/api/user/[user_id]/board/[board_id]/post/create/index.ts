import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../../../../../src/libs/server/withHandler';
import client from '../../../../../../../../src/libs/server/prisma_client';
import { withApiSession } from '../../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { Title, content, avatar } = req.body;
  const { user_id, board_id } = req.query;
  const isQuery = Boolean(user_id && board_id);
  if (!user)
    return res.json({ ok: false, error: '로그인이 필요한 기능입니다.' });
  if (!isQuery) return res.json({ ok: false, error: 'QUERY ERROR!' });
  if (!Title)
    return res.json({ ok: false, error: '포스트 제목을 입력해주세요.' });
  if (user?.id !== +user_id)
    return res.json({ ok: false, error: '유저불일치. 수정권한없음.' });
  const FoundBoard = await client.board.findUnique({
    where: { id: +board_id.toString() },
    select: { id: true, UserID: true },
  });
  if (!FoundBoard) return res.json({ ok: false, error: 'NO BOARD FOUND!' });
  const post = await client.post.create({
    data: {
      title: Title,
      content,
      avatar,
      UserID: FoundBoard.UserID,
      BoardID: FoundBoard.id,
    },
    select: { UserID: true, BoardID: true, id: true },
  });
  return res.json({ ok: true, post });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
