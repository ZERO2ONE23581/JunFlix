import { NextApiRequest, NextApiResponse } from 'next';
import prismaClient from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, birth, gender, location, email } = req.body;
  const { user } = req.session;

  const loggedInUser = await prismaClient.user.findUnique({
    where: { id: user?.id },
    select: {
      id: true,
      username: true,
      birth: true,
      gender: true,
      location: true,
      email: true,
    },
  });

  if (!loggedInUser)
    return res.json({ ok: false, error: '로그인이 필요합니다!' });

  if (email && email !== loggedInUser.email) {
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
    data: { username, birth, gender, location },
  });
  //
  return res.json({
    ok: true,
    message: '프로필이 성공적으로 업데이트 되었습니다.',
  });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
