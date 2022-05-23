import { NextApiRequest, NextApiResponse } from 'next';
import prismaClient from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { newPassword, id } = req.body;
  const mustData = Boolean(newPassword && id);
  const { user } = req.session;
  if (user) return res.json({ ok: false, error: 'YOU MUST SIGN OUT!' });
  if (!mustData) return res.json({ ok: false, error: 'MUST DATA REQUIRED' });
  //
  const foundUser = await prismaClient.user.findUnique({
    where: { id },
    select: { password: true },
  });
  if (newPassword === foundUser?.password)
    return res.json({
      ok: false,
      error: '이전 비밀번호는 사용하실수 없습니다.',
    });

  //업데이트
  await prismaClient.user.update({
    where: { id },
    data: { password: newPassword },
  });
  //
  return res.json({ ok: true });
}
export default withApiSession(
  withHandler({ methods: ['POST'], handler, isPrivate: false })
);
