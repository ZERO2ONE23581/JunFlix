import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { user } = req.session;
  const { user_id } = req.query;
  const { userId } = req.body;
  if (!user)
    return res.json({ ok: false, error: '로그인이 필요한 기능입니다.' });
  if (user.id !== +user_id)
    return res.json({ ok: false, error: '권한이 없습니다.' });
  if (!userId) return res.json({ ok: false, error: 'No input data.' });

  const FoundUser = await client.user.findUnique({
    where: { userId },
  });
  if (!FoundUser)
    return res.json({ ok: false, error: '존재하지 않는 유저입니다.' });

  if (user.id !== FoundUser.id)
    return res.json({ ok: false, error: '본인 아이디가 아닙니다.' });

  await client.user.delete({
    where: {
      id: FoundUser.id,
    },
  });
  req.session.destroy();
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
