import useSWR from 'swr';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import useUser from '../../src/libs/client/useUser';
import { IGetReviews } from '../../src/types/review';
import { Title } from '../../src/components/Tools/Title';
import { NoData } from '../../src/components/Tools/NoData';
import { HeadTitle } from '../../src/components/Layout/Head';
import { useNeedLogin } from '../../src/libs/client/useTools';
import { ReviewList } from '../../src/components/Review/Read/List';

const MyReviews: NextPage = () => {
  useNeedLogin();
  const { loggedInUser } = useUser();
  const { data } = useSWR<IGetReviews>(`/api/user/${loggedInUser?.id}/reviews`);
  return (
    <>
      <HeadTitle title={`${loggedInUser?.username}'s Reviews`} />
      <Cont>
        <Title type="review" reviewType="my" />
        {data?.reviews && <ReviewList reviews={data?.reviews} />}
        {!data?.reviews && <NoData type="review" />}
      </Cont>
    </>
  );
};
export default MyReviews;

export const Cont = styled(Page)`
  padding: 5%;
`;
