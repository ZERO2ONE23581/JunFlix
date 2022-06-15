import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { review_id } = req.query;
  const {
    avatar,
    Title,
    movieTitle,
    genre,
    content,
    score,
    oneline,
    recommend,
  } = req.body;
  const isInputData = Boolean(Title && movieTitle && genre);

  //ERR
  if (!user)
    return res.json({ ok: false, error: '로그인이 필요한 기능입니다.' });
  if (!review_id) return res.json({ ok: false, error: 'QUERY ERROR' });
  if (!isInputData)
    return res.json({ ok: false, error: '데이터가 미입력 되었습니다.' });

  //Update review
  const updatedReview = await client.review.update({
    where: { id: +review_id },
    data: {
      avatar,
      title: Title,
      movieTitle,
      genre,
      content,
      score: +score,
      oneline,
      recommend,
    },
  });

  //ERR
  if (!updatedReview)
    return res.json({ ok: false, error: 'REVIEW UPDATE FAILED!' });
  if (updatedReview.UserID !== user.id)
    return res.json({ ok: false, error: 'INVALID USER!' });

  //RETURN
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
