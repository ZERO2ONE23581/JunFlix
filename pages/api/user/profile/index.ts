import { NextApiRequest, NextApiResponse } from 'next';
import prismaClient from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, oldPassword, newPassword, newPasswordConfirm } = req.body;
  const { user } = req.session;

  if (!Boolean(userId && oldPassword && newPassword && newPasswordConfirm))
    return res.json({ ok: false, error: 'Missing Data' });

  const loggedInUser = await prismaClient.user.findUnique({
    where: { id: user?.id },
    select: { id: true, userId: true, password: true },
  });

  if (!loggedInUser)
    return res.json({ ok: false, error: '로그인이 필요합니다!' });

  if (oldPassword !== loggedInUser.password)
    return res.json({
      ok: false,
      error:
        '사용중인 비밀번호가 일치하지 않습니다. 현재 비밀번호를 재확인 해주세요.',
    });

  if (newPassword !== newPasswordConfirm)
    return res.json({
      ok: false,
      error: '비밀번호가 일치하지 않습니다. 새로운 비밀번호를 재확인 해주세요.',
    });

  const dupData = Boolean(
    await prismaClient.user.findUnique({
      where: { userId },
    })
  );
  if (dupData)
    return res.json({
      ok: false,
      error: '이미 사용중인 아이디 입니다. 아이디를 재입력 해주세요.',
    });

  const updatedUser = await prismaClient.user.update({
    where: { id: loggedInUser.id },
    data: { userId, password: newPassword },
    select: { id: true, userId: true, password: true },
  });
  //
  return res.json({
    ok: true,
    updatedUser,
    message: '새로운 정보가 성공적으로 저장되었습니다.',
  });
}

export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler, isPrivate: false })
);
