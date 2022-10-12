import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../src/libs/server/prisma_client';
import withHandler from '../../../src/libs/server/withHandler';
import { withApiSession } from '../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { title, movie, genre, avatar, description, score, isRecommend } =
    req.body;
  const { user } = req.session;
  const isInputs = Boolean(title && movie && description);
  if (!user) return res.json({ ok: false, error: 'must login.' });
  if (!isInputs) return res.json({ ok: false, error: 'inputs missed.' });
  //
  const ispassed = Boolean(
    await client.review.create({
      data: {
        title,
        movie,
        avatar,
        genre,
        score,
        description,
        isRecommend,
        host: { connect: { id: user.id } },
      },
    })
  );
  //
  if (!ispassed) return res.json({ ok: false, error: 'create review failed.' });
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
