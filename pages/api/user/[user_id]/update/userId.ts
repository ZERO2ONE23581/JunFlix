import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.body;
  const { user } = req.session;
  const { user_id } = req.query;
  if (!user) return res.json({ ok: false, error: 'must login.' });
  if (!userId) return res.json({ ok: false, error: 'input missed.' });
  if (user.id !== +user_id)
    return res.json({ ok: false, error: 'user not match.' });
  //
  const LoggedInUser = await client.user.findUnique({ where: { id: user.id } });
  if (LoggedInUser) {
    if (LoggedInUser.userId === userId)
      return res.json({ ok: false, message: '현재 사용중인 아이디 입니다.' });
    //
    const alredayExists = await client.user.findUnique({
      where: { userId },
    });
    if (alredayExists)
      return res.json({ ok: false, error: '이미 사용중인 아이디 입니다.' });
    //
    await client.user.update({
      where: { id: LoggedInUser.id },
      data: { userId },
    });
    return res.json({
      ok: true,
      message: '업데이트 완료 (Update completed)',
    });
  } else return res.json({ ok: false, error: 'must login.' });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
