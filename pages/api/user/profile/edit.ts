import { NextApiRequest, NextApiResponse } from 'next';
import prismaClient from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    category,
    userID,
    email,
    oldPassword,
    newPassword,
    newPasswordConfirm,
    username,
    name,
    birth,
    gender,
    location,
    avatar,
  } = req.body;

  //LOGIN ERROR
  const { user } = req.session;
  const loggedInUser = await prismaClient.user.findUnique({
    where: { id: user?.id },
  });
  if (!loggedInUser)
    return res.json({ ok: false, error: '로그인이 필요합니다!' });

  const idMatch = { id: loggedInUser.id };
  console.log(category);

  //UserId
  if (category.userId) {
    if (!userID)
      return res.json({ type: 'userId', ok: false, error: 'NO USERID ERROR!' });

    if (userID === loggedInUser.userId)
      return res.json({
        type: 'userId',
        ok: false,
        error: '현재 쓰고계신 아이디 입니다. 새로운 아이디를 입력해주세요.',
      });

    const dupData = Boolean(
      await prismaClient.user.findUnique({
        where: { userId: userID.toString() },
      })
    );

    if (dupData)
      return res.json({
        type: 'userId',
        ok: false,
        error: '이미 등록된 아이디 입니다. 아이디를 재입력 해주세요.',
      });

    await prismaClient.user.update({
      where: { ...idMatch },
      data: { userId: userID.toString() },
    });
    //
    return res.json({
      type: 'userId',
      ok: true,
    });
  }

  //Password
  if (category.password) {
    const password = Boolean(oldPassword && newPassword && newPasswordConfirm);
    if (!password)
      return res.json({
        type: 'password',
        ok: false,
        error: 'NO PASSWORD ERROR!',
      });

    if (oldPassword !== loggedInUser.password)
      return res.json({
        type: 'password',
        ok: false,
        error:
          '비밀번호가 일치하지 않습니다. 현재 쓰고계신 비밀번호를 재확인 해주세요.',
      });
    if (newPassword !== newPasswordConfirm)
      return res.json({
        type: 'password',
        ok: false,
        error: 'invalid password confirm',
      });
    if (newPassword === loggedInUser.password)
      return res.json({
        type: 'password',
        ok: false,
        error:
          '현재 쓰고 계신 비밀번호 입니다. 새로운 비밀번호를 입력해주세요.',
      });
    //UPDATE
    await prismaClient.user.update({
      where: { ...idMatch },
      data: { password: newPassword },
    });
    //
    return res.json({
      type: 'password',
      ok: true,
    });
  }

  //UserInfo
  if (category.userInfo) {
    if (!username) {
      await prismaClient.user.update({
        where: { ...idMatch },
        data: {
          username: 'Anonymous',
          name,
          birth,
          gender,
          location,
          email,
          avatar,
        },
      });
      return res.json({
        type: 'userInfo_noUsername',
        ok: true,
      });
    }
    //DUPDATA CHECK (EMAIL)
    if (email !== loggedInUser.email) {
      const dupData = Boolean(
        await prismaClient.user.findUnique({
          where: { email },
        })
      );
      if (dupData)
        return res.json({
          type: 'userInfo',
          ok: false,
          error: '이미 사용중인 이메일 입니다. 다른 이메일을 이용해 주세요.',
        });
      await prismaClient.user.update({
        where: { ...idMatch },
        data: { email },
      });
    }
    //UPDATE
    await prismaClient.user.update({
      where: { ...idMatch },
      data: { username, name, birth, gender, location, email, avatar },
    });
    //
    return res.json({
      type: 'userInfo',
      ok: true,
    });
  }
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
