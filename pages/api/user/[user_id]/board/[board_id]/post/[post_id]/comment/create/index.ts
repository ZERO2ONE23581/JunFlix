import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { content } = req.body;
  const { user_id, board_id, post_id } = req.query;
  const queryExists = Boolean(user_id && board_id && post_id);
  if (!user)
    return res.json({ ok: false, error: '로그인이 필요한 기능입니다.' });
  if (!content)
    return res.json({ ok: false, error: '데이터가 미입력 되었습니다.!' });
  if (!queryExists) return res.json({ ok: false, error: 'QUERY ERROR!' });
  //
  await client.comment.create({
    data: {
      content,
      user: { connect: { id: user?.id } },
      post: { connect: { id: +post_id.toString() } },
    },
  });
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
