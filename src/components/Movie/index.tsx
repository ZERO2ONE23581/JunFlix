import useSWR from 'swr';
import { List } from './List';
import { useEffect, useState } from 'react';
import { PageTitle } from './Title';

interface IMovie {
  type: string;
}
export const Movie = ({ type }: IMovie) => {
  const [api, setApi] = useState('');
  useEffect(() => {
    if (type) setApi(`/api/movie/${type}`);
  }, [type, setApi]);
  const { data } = useSWR(api);
  const isData = Boolean(data?.arr?.results.length !== 0);
  //const array = data?.arr?.results?.slice(0, 8)?.reverse();
  const array = data?.arr?.results?.slice(0, 5);
  return (
    <>
      {isData && (
        <>
          <PageTitle type={type} />
          <List array={array} />
        </>
      )}
      {!isData && <h1>NO MOVIE API...</h1>}
    </>
  );
};
