import { NextApiRequest, NextApiResponse } from 'next';
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
  if (!user)
    return res.json({ ok: false, error: '로그인이 필요한 기능입니다.' });
  await req.session.destroy();
  return res.redirect('/user/login');
}
export default withApiSession(withHandler({ methods: ['GET'], handler }));
