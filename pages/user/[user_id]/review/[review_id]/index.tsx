import useSWR from 'swr';
import { useState } from 'react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import useUser from '../../../../../src/libs/client/useUser';
import { IGetReview } from '../../../../../src/types/review';
import { CommentList } from '../../../../../src/components/User/Comment/CommentList';
import { ReviewDetail } from '../../../../../src/components/User/Review/ReviewDetail';
import { ReviewBtnWrap } from '../../../../../src/components/User/Review/ReviewBtnWrap';
import { LikeCommentWrap } from '../../../../../src/components/Style/Icon/LikeCommentWrap';
import { CreateComments } from '../../../../../src/components/User/Comment/Create/CreateComments';
import { DeleteCommentModal } from '../../../../../src/components/User/Comment/Delete/DeleteCommentModal';

const ReviewInfo: NextPage = () => {
  const router = useRouter();
  const { review_id } = router.query;
  const { loggedInUser } = useUser();
  const isQueryId = loggedInUser && review_id;
  const { data } = useSWR<IGetReview>(
    isQueryId && `/api/user/${loggedInUser.id}/review/${review_id}`
  );
  const [openDelModal, setOpenDelModal] = useState(false);
  return (
    <>
      <Cont>
        <ReviewBtnWrap
          user={loggedInUser}
          data={data}
          setDelModal={setOpenDelModal}
        />
        <ReviewDetail data={data} />
        <div>
          <LikeCommentWrap type="review" reviewId={null} userId={null} />
          <h1>해당 리뷰에 댓글 남기기</h1>
          <CreateComments type="review" />
          <CommentList isReview />
        </div>
      </Cont>
      {openDelModal && (
        <DeleteCommentModal type="review" setOpenDelModal={setOpenDelModal} />
      )}
    </>
  );
};
export default ReviewInfo;

const Cont = styled.section`
  padding: 20px 20%;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
`;
