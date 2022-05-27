import client from '../../../src/libs/server/prisma_client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../src/libs/server/withHandler';
import { withApiSession } from '../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const nowPlaying = await (
    await fetch(
      ` https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.THE_MOVIE_DB_API_KEY}&language=en-US&page=1`
    )
  ).json();

  //
  return res.json({ ok: true, nowPlaying });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
