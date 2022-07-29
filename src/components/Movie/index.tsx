import useSWR from 'swr';
import { List } from './List';
import { useEffect, useState } from 'react';

interface IMovieApi {
  type?: string;
}
export const MovieAPI = ({ type }: IMovieApi) => {
  const [api, setApi] = useState('');
  useEffect(() => {
    if (type) setApi(`/api/movie/${type}`);
  }, [type, setApi]);
  const { data } = useSWR(api);
  const isData = Boolean(data?.arr?.results.length !== 0);
  //const array = data?.arr?.results?.slice(0, 8)?.reverse();
  const array = data?.arr?.results?.slice(0, 8);
  return (
    <>
      {isData && <List array={array} />}
      {!isData && <h1>NO MOVIE API...</h1>}
    </>
  );
};
