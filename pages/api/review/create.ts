import prismaClient from '../../../src/libs/server/prisma_client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../src/libs/server/withHandler';
import { withApiSession } from '../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const {
    avatar,
    Title,
    movieTitle,
    genre,
    content,
    oneline,
    recommend,
    score,
  } = req.body;
  const noInput = !Boolean(Title && movieTitle && genre && content);

  //error handling
  if (!user) return res.json({ ok: false, error: 'MUST LOGIN' });
  if (noInput) return res.json({ ok: false, error: 'NO INPUT DATA' });

  //Create review
  await prismaClient.review.create({
    data: {
      title: Title,
      movieTitle,
      genre,
      content,
      score: +score,
      oneline,
      recommend,
      UserID: user.id,
    },
  });
  //
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
