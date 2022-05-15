import { NextApiRequest, NextApiResponse } from 'next';
import prismaClient from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { user } = req.session;
  if (!user) return res.json({ ok: false, error: 'YOU MUST SIGN IN!' });

  const deleteConfirm = req.body;
  if (!deleteConfirm)
    return res.json({ ok: false, error: 'YOU MUST CONFIRM TO DELETE!' });

  await prismaClient.user.delete({
    where: {
      id: user.id,
    },
  });
  await req.session.destroy();
  return res.json({ ok: true });
}

export default withApiSession(
  withHandler({ methods: ['POST'], handler, isPrivate: false })
);
