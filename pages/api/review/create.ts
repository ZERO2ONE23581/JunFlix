import prismaClient from '../../../src/libs/server/prisma_client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../src/libs/server/withHandler';
import { withApiSession } from '../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { titleCap, movieTitle, genre, content } = req.body;
  const noInput = !Boolean(titleCap && movieTitle && genre && content);

  //error handling
  if (!user) return res.json({ ok: false, error: 'MUST LOGIN' });
  if (noInput) return res.json({ ok: false, error: 'NO INPUT DATA' });
  //
  await prismaClient.review.create({
    data: {
      title: titleCap,
      movieTitle,
      genre,
      content,
      UserID: user.id,
    },
  });
  //
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
