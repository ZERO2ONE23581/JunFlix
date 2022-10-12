import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const inputs = req.body;
  const { user } = req.session;
  const { review_id } = req.query;
  if (!user) return res.json({ ok: false, error: 'must login.' });
  if (!inputs) return res.json({ ok: false, error: 'inputs missed.' });
  if (!review_id) return res.json({ ok: false, error: 'query missed.' });
  //
  const review = await client.review.findUnique({
    where: { id: +review_id },
    select: { id: true, host_id: true },
  });
  if (!review) return res.json({ ok: false, error: 'no review found.' });
  const isHost = Boolean(review.host_id === user.id);
  if (!isHost) return res.json({ ok: false, error: 'invalid host.' });
  //
  const isPassed = Boolean(
    await client.review.update({
      where: { id: review.id },
      data: {
        movie: inputs.movie,
        genre: inputs.genre,
        score: inputs.score,
        title: inputs.title,
        avatar: inputs.avatar,
        isRecommend: inputs.isRecommend,
        description: inputs.description,
      },
    })
  );
  if (!isPassed) return res.json({ ok: false, error: 'update failed.' });
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
