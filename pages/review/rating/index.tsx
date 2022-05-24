import useSWR from 'swr';
import type { NextPage } from 'next';

const rating: NextPage = () => {
  const { data: rating } = useSWR(`/api/review/rating/all_rating`);
  //
  return <>Rating1</>;
};
export default rating;
