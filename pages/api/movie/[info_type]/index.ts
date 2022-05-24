import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { info_type } = req.query;
  const BASE_URL = 'https://api.themoviedb.org/3';
  const LANGUAGE = 'language=en-US&page=1';
  //
  if (info_type === 'trending') {
    const trendingData = await (
      await fetch(
        `${BASE_URL}/trending/akk/day?api_key=${process.env.THEMOVIEDB_APIKEY}`
      )
    ).json();
    return res.json({ ok: true, trendingData });
  }
  if (info_type === 'now_playing') {
    const nowPlayingMovies = await (
      await fetch(
        `${BASE_URL}/movie/now_playing?api_key=${process.env.THEMOVIEDB_APIKEY}&${LANGUAGE}`
      )
    ).json();
    return res.json({ ok: true, nowPlayingMovies });
  }
  if (info_type === 'popular_tv') {
    const popularTvShows = await (
      await fetch(
        `${BASE_URL}/tv/popular?api_key=${process.env.THEMOVIEDB_APIKEY}&${LANGUAGE}`
      )
    ).json();
    return res.json({ ok: true, popularTvShows });
  }
  if (info_type === 'upcoming') {
    const upcomingMovies = await (
      await fetch(
        ` ${BASE_URL}/movie/upcoming?api_key=${process.env.THEMOVIEDB_APIKEY}&${LANGUAGE}`
      )
    ).json();
    return res.json({ ok: true, upcomingMovies });
  }
  if (info_type === 'top_rated') {
    const topRatedMovies = await (
      await fetch(
        ` ${BASE_URL}/movie/top_rated?api_key=${process.env.THEMOVIEDB_APIKEY}&${LANGUAGE}`
      )
    ).json();
    return res.json({ ok: true, topRatedMovies });
  }
  return res.json({ ok: false, error: 'NO MOVIE API!' });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
