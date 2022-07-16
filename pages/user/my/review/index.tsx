import useSWR from 'swr';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../../../styles/global';
import useUser from '../../../../src/libs/client/useUser';
import { IGetReviews } from '../../../../src/types/review';
import { ReviewList } from '../../../../src/components/Review/Read/List';
import { Title, TitleSign } from '../../../../src/components/Layout/Title';

const MyReviews: NextPage = () => {
  const { loggedInUser } = useUser();
  const { data } = useSWR<IGetReviews>(`/api/user/my/reviews`);
  return (
    <>
      <Title title={`${loggedInUser?.username}'s Reviews`} />
      <Cont>
        <TitleSign
          width="400px"
          svg="clapper"
          svgSize="1.8rem"
          type="Movie Reviews"
          name={loggedInUser?.username!}
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

export const Cont = styled(Page)`
  padding: 0% 8%;
`;
