import useSWR from 'swr';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../../../styles/global';
import useUser from '../../../../src/libs/client/useUser';
import { IGetReviews } from '../../../../src/types/review';
import { ReviewList } from '../../../../src/components/Review/Read/List';
import { HeadTitle } from '../../../../src/components/Title/Head';
import { Title } from '../../../../src/components/Title';

const MyReviews: NextPage = () => {
  const { loggedInUser } = useUser();
  const { data } = useSWR<IGetReviews>(`/api/user/my/reviews`);
  return (
    <>
      <HeadTitle title={`${loggedInUser?.username}'s Reviews`} />
      <Cont>
        <Title
          kind="Reviews"
          name={loggedInUser?.username!}
          svg={{ type: 'clapper', size: '2rem' }}
        />
        {data?.reviews && <ReviewList reviews={data?.reviews} />}
        {!data?.reviews && (
          <>
            <h1>NO REVIES FOUND...</h1>
          </>
        )}
      </Cont>
    </>
  );
};
export default MyReviews;

export const Cont = styled(Page)``;
