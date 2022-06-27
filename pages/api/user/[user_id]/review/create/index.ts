import client from '../../../../../../src/libs/server/prisma_client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id } = req.query;
  const isQuery = Boolean(user_id);
  const {
    title,
    movieTitle,
    genre,
    avatar,
    content,
    oneline,
    recommend,
    score,
  } = req.body;
  const isInputData = Boolean(title && movieTitle && genre && content);
  if (!user) return res.json({ ok: false, error: 'Need to login.' });
  if (!isQuery) return res.json({ ok: false, error: 'invalid url.' });
  if (!isInputData) return res.json({ ok: false, error: 'No inputs.' });
  if (user.id !== +user_id)
    return res.json({ ok: false, error: 'Invalid User.' });
  //
  const review = await client.review.create({
    data: {
      title,
      movieTitle,
      avatar,
      genre,
      content,
      score: +score,
      oneline,
      recommend,
      UserID: user.id,
    },
    select: { UserID: true, id: true },
  });
  //
  return res.json({ ok: true, review });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
