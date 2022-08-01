import useSWR from 'swr';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Page } from '../../../../../styles/global';
import { IGetReview } from '../../../../../src/types/review';
import { Info } from '../../../../../src/components/Review/Read/Info';
import { HeadTitle } from '../../../../../src/components/Layout/Head';

const ReviewPage: NextPage = () => {
  const router = useRouter();
  const { user_id, review_id } = router.query;
  const { data } = useSWR<IGetReview>(
    user_id && review_id && `/api/user/${user_id}/review/${review_id}`
  );
  return (
    <>
      <HeadTitle title="MOVIE REVIEW" />
      <Cont>
        {data && <Info review={data.review!} />}
        {!data && <h1>No data found..</h1>}
      </Cont>
    </>
  );
};
export default ReviewPage;

const Cont = styled(Page)`
  padding: 2% 0;
  min-height: 100%;
`;
