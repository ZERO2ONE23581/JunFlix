import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import prismaClient from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, password } = req.body;
  //
  if (!Boolean(userId && password))
    return res.json({ ok: false, error: '데이터가 미입력 되었습니다.' });

  //일치하는 유저찾기
  const foundUser = await prismaClient.user.findUnique({
    where: { userId },
    select: { id: true, userId: true, password: true },
  });
  if (!foundUser)
    return res.json({ ok: false, error: '아이디가 일치하지 않습니다.' });

  if (foundUser?.password !== password)
    return res.json({ ok: false, error: '비밀번호가 일치하지 않습니다.' });

  //쿠키저장
  req.session.user = {
    id: foundUser?.id,
  };
  await req.session.save();
  const { user } = req.session;
  console.log(user);
  //
  return res.json({ ok: true });
}
export default withIronSessionApiRoute(withHandler(['POST'], handler), {
  cookieName: 'junflix_cookie',
  password: 'asdfl;jkasdjljfljasdjfjasdlkjfkljkl;sdajfkl;jasdk;jfjsdkal',
});
