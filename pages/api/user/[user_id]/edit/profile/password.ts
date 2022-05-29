import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id } = req.query;
  const { currentPassword, password, passwordConfirm } = req.body;
  const mustData = Boolean(currentPassword && password && passwordConfirm);
  //
  if (user?.id !== Number(user_id))
    return res.json({ ok: false, error: 'INVALID USERID QUERY' });
  if (!mustData) return res.json({ ok: false, error: 'INPUT DATA REQUIRED' });
  const currentUser = await client.user.findUnique({
    where: { id: user.id },
  });
  if (!currentUser) return res.json({ ok: false, error: 'MUST LOGIN!' });

  //비밀번호 확인 불일치
  if (password !== passwordConfirm)
    return res.json({ ok: false, error: 'PASSWORD CONFIRM FAIL' });
  //현재 비밀번호 불일치
  if (currentPassword !== currentUser.password)
    return res.json({ ok: false, error: 'CURRENT PASSWORD ERROR' });
  //같은 비밀번호
  if (password === currentUser.password)
    return res.json({ ok: false, error: 'SAME PASSWORD' });
  //Update
  await client.user.update({
    where: { id: currentUser.id },
    data: { password },
  });
  //
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
