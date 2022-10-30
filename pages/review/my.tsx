import useSWR from 'swr';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import useUser from '../../src/libs/client/useUser';
import { IGetReviews } from '../../src/types/review';
import { Title } from '../../src/Tools/box_title';
import { NoData } from '../../src/Tools/NoData';
import { HeadTitle } from '../../src/Tools/head_title';
import { useNeedLogin } from '../../src/libs/client/useTools';
import { ReviewList } from '../../src/components/Review/Read/List/list';

const MyReviews: NextPage<{ theme: boolean }> = ({ theme }) => {
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
