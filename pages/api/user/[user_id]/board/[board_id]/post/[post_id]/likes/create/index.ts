import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(`HELLOWORLD`);
  return;
  const { user } = req.session;
  const { user_id, board_id, post_id } = req.query;
  const noQuery = !Boolean(user_id && board_id && post_id);
  if (!user) return res.json({ ok: false, error: 'MUST LOGIN!' });
  if (noQuery) return res.json({ ok: false, error: 'QUERY ERROR!' });

  //좋아요 찾기
  //좋아요 만들기
  //좋아요 삭제

  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
