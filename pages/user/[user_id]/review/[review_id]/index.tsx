import useSWR from 'swr';
import { useState } from 'react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import useUser from '../../../../../src/libs/client/useUser';
import { IGetReview } from '../../../../../src/types/review';
import { BtnWrap } from '../../../../../src/components/Review/button';
import { AllComments } from '../../../../../src/components/Comment/AllComments';
import { DeleteModal } from '../../../../../src/components/Modal/Board/Delete';
import { LikeCommentWrap } from '../../../../../src/components/Icon/LikeCommentWrap';
import { CreateCommentOnReview } from '../../../../../src/components/Comment/Create/Review';
import { ReviewInfo } from '../../../../../src/components/Review/info';
import { IconWrap } from '../../../../../styles/default';

const ReviewDetail: NextPage = () => {
  const router = useRouter();
  const { review_id } = router.query;
  const { loggedInUser } = useUser();
  const isQueryId = loggedInUser && review_id;
  const { data } = useSWR<IGetReview>(
    isQueryId && `/api/user/${loggedInUser.id}/review/${review_id}`
  );
  const [delModal, setDelModal] = useState(false);
  //
  return (
    <>
      <Cont>
        <BtnWrap user={loggedInUser} data={data} setDelModal={setDelModal} />
        <ReviewInfo data={data} />
        <IconWrap>
          <LikeCommentWrap type="review" reviewId={null} userId={null} />
          <h1>해당 리뷰에 댓글 남기기</h1>
          <CreateCommentOnReview />
          <AllComments type="review" />
        </IconWrap>
      </Cont>
      <DeleteModal
        delModal={delModal}
        deleteClick={() => setDelModal((p) => !p)}
      />
    </>
  );
};
export default ReviewDetail;

const Cont = styled.section`
  padding: 20px 20%;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
`;
