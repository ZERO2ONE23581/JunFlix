import { NextApiRequest, NextApiResponse } from 'next';
import prismaClient from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    postType,
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

  //USERID EDIT
  if (postType === 'userId') {
    //NO INFO ERROR
    if (!userID) return res.json({ ok: false, error: 'NO USERID ERROR!' });
    //DUPDATA CHECK (USERID)
    if (userID !== loggedInUser.userId) {
      const dupData = Boolean(
        await prismaClient.user.findUnique({
          where: { userId: userID.toString() },
        })
      );
      if (dupData)
        return res.json({
          ok: false,
          error: '이미 사용중인 아이디 입니다. 아이디를 재입력 해주세요.',
        });
      //UPDATE
      await prismaClient.user.update({
        where: { id: loggedInUser.id },
        data: { userId: userID.toString() },
      });
    }
  }

  //PW EDIT
  if (postType === 'password') {
    //NO INFO ERROR
    const password = Boolean(oldPassword && newPassword && newPasswordConfirm);
    if (!password) return res.json({ ok: false, error: 'NO PASSWORD ERROR!' });
    //OTHER ERRORS
    if (oldPassword !== loggedInUser.password)
      return res.json({
        ok: false,
        error: 'invalid current password',
      });
    if (newPassword !== newPasswordConfirm)
      return res.json({
        ok: false,
        error: 'invalid password confirm',
      });
    if (newPassword === loggedInUser.password)
      return res.json({
        ok: false,
        error: 'different password needed',
      });
    //UPDATE
    await prismaClient.user.update({
      where: { id: loggedInUser.id },
      data: { password: newPassword },
    });
  }

  //USERINFO EDIT
  if (postType === 'userInfo') {
    if (!username) {
      await prismaClient.user.update({
        where: { id: loggedInUser.id },
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
        ok: true,
        message: 'username saved as anonymous',
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
          ok: false,
          error: '이미 사용중인 이메일 입니다. 다른 이메일을 이용해 주세요.',
        });
      await prismaClient.user.update({
        where: { id: loggedInUser.id },
        data: { email },
      });
    }
    //UPDATE
    await prismaClient.user.update({
      where: { id: loggedInUser.id },
      data: { username, name, birth, gender, location, email, avatar },
    });
  }
  //
  return res.json({
    ok: true,
    message: 'profile edit success',
  });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
