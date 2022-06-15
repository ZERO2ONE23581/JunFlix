import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

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
  if (!user)
    return res.json({ ok: false, error: '로그인이 필요한 기능입니다.' });
  if (user.id !== +user_id)
    return res.json({ ok: false, error: '권한이 없습니다.' });
  await client.user.delete({
    where: {
      id: user.id,
    },
  });
  await req.session.destroy();
  return res.json({ ok: true });
}

export default withApiSession(withHandler({ methods: ['POST'], handler }));
