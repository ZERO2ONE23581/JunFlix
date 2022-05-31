import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id } = req.query;
  const { userId, email } = req.body;
  const mustData = Boolean(userId || email);
  //
  if (!user) return res.json({ ok: false, error: 'MUST LOGIN!' });
  if (!mustData) return res.json({ ok: false, error: 'INPUT DATA REQUIRED' });
  if (user?.id !== Number(user_id))
    return res.json({ ok: false, error: 'INVALID USERID QUERY' });
  const currentUser = await client.user.findUnique({
    where: { id: user.id },
  });
  //
  if (userId) {
    //같은 아이디
    if (currentUser && currentUser.userId === userId)
      return res.json({ ok: false, error: 'SAME ID' });
    //중복아이디
    const alreadyUsed = await client.user.findUnique({
      where: { userId },
    });
    if (alreadyUsed)
      return res.json({ ok: false, error: 'ALREADY TAKEN USERID' });
    //Update
    await client.user.update({
      where: { id: user.id },
      data: { userId },
    });
    return res.json({ ok: true, method: 'userId' });
  }
  if (email) {
    //같은 이메일
    if (currentUser && currentUser.email === email)
      return res.json({ ok: false, error: 'SAME EMAIL' });
    //중복이메일
    const alreadyUsed = await client.user.findUnique({
      where: { email },
    });
    if (alreadyUsed)
      return res.json({ ok: false, error: 'ALREADY TAKEN EMAIL' });
    //Update
    await client.user.update({
      where: { id: user.id },
      data: { email },
    });
    return res.json({ ok: true, method: 'email' });
  }
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
