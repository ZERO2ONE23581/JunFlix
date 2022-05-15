import { NextApiRequest, NextApiResponse } from 'next';
import prismaClient from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
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

  //USERID EDIT
  if (method === 'userId') {
    //NO INFO ERROR
    if (!userID) return res.json({ ok: false, error: 'NO USERID ERROR!' });
    if (userID === loggedInUser.userId)
      return res.json({ ok: false, error: 'no change on userId' });

    //DUPDATA CHECK (USERID)
    const dupData = Boolean(
      await prismaClient.user.findUnique({
        where: { userId: userID.toString() },
      })
    );
    if (dupData) return res.json({ ok: false, error: 'userId already exists' });

    //UPDATE
    await prismaClient.user.update({
      where: { ...idMatch },
      data: { userId: userID.toString() },
    });
  }

  //PW EDIT
  if (method === 'password') {
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
        error: 'no change on password',
      });

    //UPDATE
    await prismaClient.user.update({
      where: { ...idMatch },
      data: { password: newPassword },
    });
  }

  //USERINFO EDIT
  if (method === 'userInfo') {
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
        where: { ...idMatch },
        data: { email },
      });
    }
    //UPDATE
    await prismaClient.user.update({
      where: { ...idMatch },
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
