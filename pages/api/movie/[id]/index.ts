import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const BASE_URL = 'https://api.themoviedb.org/3';
  const LANGUAGE = 'language=en-US&page=1';
  //
  if (id === 'trending') {
    const api = `${BASE_URL}/trending/all/day?api_key=${process.env.THE_MOVIE_DB_API_KEY}`;
    const arr = await (await fetch(api)).json();
    return res.json({ ok: true, arr });
  }
  if (id === 'now') {
    const api = `${BASE_URL}/movie/now_playing?api_key=${process.env.THE_MOVIE_DB_API_KEY}&${LANGUAGE}`;
    const arr = await (await fetch(api)).json();
    return res.json({ ok: true, arr });
  }
  if (id === 'tv') {
    const api = `${BASE_URL}/tv/popular?api_key=${process.env.THE_MOVIE_DB_API_KEY}&${LANGUAGE}`;
    const arr = await (await fetch(api)).json();
    return res.json({ ok: true, arr });
  }
  if (id === 'upcoming') {
    const api = ` ${BASE_URL}/movie/upcoming?api_key=${process.env.THE_MOVIE_DB_API_KEY}&${LANGUAGE}`;
    const arr = await (await fetch(api)).json();
    return res.json({ ok: true, arr });
  }
  if (id === 'top') {
    const api = ` ${BASE_URL}/movie/top_rated?api_key=${process.env.THE_MOVIE_DB_API_KEY}&${LANGUAGE}`;
    const arr = await (await fetch(api)).json();
    return res.json({ ok: true, arr });
  }
  return res.json({ ok: false, error: 'api error!' });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
