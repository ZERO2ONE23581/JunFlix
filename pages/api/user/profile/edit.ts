import { NextApiRequest, NextApiResponse } from 'next';
import prismaClient from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    userId,
    oldPassword,
    newPassword,
    newPasswordConfirm,
    username,
    name,
    birth,
    gender,
    location,
    email,
    avatar,
  } = req.body;

  const { user } = req.session;
  //
  const loggedInUser = await prismaClient.user.findUnique({
    where: { id: user?.id },
  });
  if (!loggedInUser)
    return res.json({ ok: false, error: '로그인이 필요합니다!' });
  //
  const AcctInfo = Boolean(
    userId || oldPassword || newPassword || newPasswordConfirm
  );

  if (AcctInfo) {
    if (oldPassword !== loggedInUser.password)
      return res.json({
        ok: false,
        error:
          '사용중인 비밀번호가 일치하지 않습니다. 현재 비밀번호를 재확인 해주세요.',
      });

    if (newPassword !== newPasswordConfirm)
      return res.json({
        ok: false,
        error:
          '비밀번호가 일치하지 않습니다. 새로운 비밀번호를 재확인 해주세요.',
      });

    //아이디 중복체크
    if (userId && userId !== loggedInUser.userId) {
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
      await prismaClient.user.update({
        where: { id: loggedInUser.id },
        data: { userId },
      });
    }
    await prismaClient.user.update({
      where: { id: loggedInUser.id },
      data: { password: newPassword },
    });
  }
  //
  if (!AcctInfo) {
    //이메일 중복체크
    if (email !== loggedInUser.email) {
      const dupData = Boolean(
        await prismaClient.user.findUnique({
          where: { email },
        })
      );
      if (dupData)
        return res.json({
          ok: false,
          error: '이미 사용중인 이메일 입니다. 다른 이메일을 이용해 주세요.',
        });
      await prismaClient.user.update({
        where: { id: loggedInUser.id },
        data: { email },
      });
    }

    await prismaClient.user.update({
      where: { id: loggedInUser.id },
      data: { username, name, birth, gender, location },
    });
  }
  //
  return res.json({
    ok: true,
    message: '프로필이 성공적으로 업데이트 되었습니다.',
  });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
