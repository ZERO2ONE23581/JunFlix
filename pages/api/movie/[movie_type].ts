import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../src/libs/server/withHandler';
import { withApiSession } from '../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { movie_type } = req.query;
  const language = 'language=en-US&page=1';
  const base = 'https://api.themoviedb.org/3';
  const key = process.env.THE_MOVIE_DB_API_KEY;

  const api_type = (movie_type: string | string[]) => {
    if (movie_type === 'tv') return `tv/popular?api_key`;
    if (movie_type === 'top') return `movie/top_rated?api_key`;
    if (movie_type === 'now') return `movie/now_playing?api_key`;
    if (movie_type === 'upcoming') return `movie/upcoming?api_key`;
    if (movie_type === 'trending') return `trending/all/day?api_key`;
  };
  const API = (movie_type: string | string[]) => {
    if (movie_type === 'trending')
      return `${base}/${api_type(movie_type)}=${key}`;
    else return `${base}/${api_type(movie_type)}=${key}&${language}`;
  };
  //
  const movies = await (await fetch(API(movie_type))).json();
  const isData = Boolean(movies?.results?.length > 0);
  if (!isData) return res.json({ ok: false, error: 'no data found from API.' });
  return res.json({ ok: true, movies: movies?.results });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
