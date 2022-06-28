import useSWR from 'swr';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CommentReplies } from './CommentReplies';
import { CommentBtnWrap } from './CommentBtnWrap';
import { EditComments } from './Edit/EditComments';
import { ProfileAvatar } from '../Avatar/Profile';
import { CreateComments } from './Create/CreateComments';
import { IGetCommentInfo } from '../../../types/comments';
import { DeleteComments } from './Delete/DeleteComments';
import { ErrorMsg } from '../../Style/ErrMsg';

interface ICommentInfoProps {
  isPost?: boolean;
  isReview?: boolean;
  commentId: number | any;
}

export const CommentDetail = ({
  isPost,
  isReview,
  commentId,
}: ICommentInfoProps) => {
  const router = useRouter();
  const { user_id, board_id, post_id, review_id } = router.query;
  const PostQuery = isPost && user_id && commentId && board_id && post_id;
  const ReviewQuery = isReview && user_id && commentId && review_id;
  const { data: PostData } = useSWR<IGetCommentInfo>(
    PostQuery &&
      `/api/user/${user_id}/board/${board_id}/post/${post_id}/comment/${commentId}`
  );
  const { data: ReviewData } = useSWR<IGetCommentInfo>(
    ReviewQuery &&
      `/api/user/${user_id}/review/${review_id}/comment/${commentId}`
  );
  const PostCmt = PostData?.comment;
  const ReviewCmt = ReviewData?.comment;
  const [saveId, setSaveId] = useState(0);
  const [openReply, setOpenReply] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelModal, setOpenDelModal] = useState(false);

  const [date, setDate] = useState('');
  useEffect(() => {
    if (isPost && PostCmt) {
      const date = new Date(PostCmt.createdAt);
      setDate(
        `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
      );
    }
    if (isReview && ReviewCmt) {
      const date = new Date(ReviewCmt.createdAt);
      setDate(
        `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
      );
    }
  }, [setDate, isPost, isReview, PostCmt, ReviewCmt]);

  const CommentID = isPost ? PostCmt?.id : isReview ? ReviewCmt?.id : null;
  const CommentType = isPost ? 'post' : isReview ? 'review' : null;
  const CommentContent = isPost
    ? PostCmt?.content
    : isReview
    ? ReviewCmt?.content
    : null;
  const IsIDForEdit = Boolean(
    saveId === PostCmt?.id || saveId === ReviewCmt?.id
  );
  const CmtAvatarUrl = isPost
    ? PostCmt?.user.avatar
    : isReview
    ? ReviewCmt?.user.avatar
    : null;
  const CmtUsername = isPost
    ? PostCmt?.user.username
    : isReview
    ? ReviewCmt?.user.username
    : null;
  const CreatorID = isPost
    ? PostCmt?.UserID
    : isReview
    ? ReviewCmt?.UserID
    : null;
  //
  return (
    <Cont>
      {PostData?.error && <ErrorMsg error={PostData.error} />}
      <Wrap>
        <ProfileAvatar url={CmtAvatarUrl} />
        <Desc>
          <DescWrap>
            <CmtInfo>
              <span className="id">#{CommentID}</span>
              <span className="username">{CmtUsername}</span>
              <span className="date">created at {date}</span>
            </CmtInfo>
            <CommentBtnWrap
              id={CommentID}
              ownerId={CreatorID}
              saveId={saveId}
              setSaveId={setSaveId}
              setOpenReply={setOpenReply}
              setOpenEdit={setOpenEdit}
              setOpenDelModal={setOpenDelModal}
            />
          </DescWrap>
          {openEdit && IsIDForEdit ? (
            <EditComments
              type={CommentType}
              parentId={CommentID}
              ogContent={CommentContent}
            />
          ) : (
            <Content>{CommentContent}</Content>
          )}
        </Desc>
      </Wrap>
      {openReply && IsIDForEdit && (
        <CreateComments type={CommentType} parentId={CommentID} />
      )}

      {isPost && <CommentReplies isPost parentId={PostCmt?.id} />}
      {isReview && <CommentReplies isReview parentId={ReviewCmt?.id} />}

      {openDelModal && (
        <DeleteComments
          id={CommentID}
          type={CommentType}
          setSaveId={setSaveId}
          setOpenDelModal={setOpenDelModal}
        />
      )}
    </Cont>
  );
};

const Cont = styled.article`
  position: relative;
  padding: 10px 15px;
  margin: 10px 0;
  border-radius: 5px;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
`;
const Wrap = styled.article`
  position: relative;
  gap: 20px;
  display: flex;
  align-items: center;
`;
const Desc = styled.article`
  width: 100%;
  font-size: 1.2rem;
  padding: 10px 0;
  padding-right: 20px;
  border-radius: 5px;
`;
const CmtInfo = styled.article`
  gap: 5px;
  display: flex;
  align-items: center;
  .id {
    font-weight: bold;
  }
  .username {
    font-weight: bold;
    font-size: 1.1rem;
  }
  .date {
    opacity: 0.8;
    font-size: 1rem;
    font-style: italic;
  }
`;
const DescWrap = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const Content = styled.article`
  width: 100%;
  height: 100px;
  padding: 20px;
  font-size: 1.1rem;
  border-radius: 5px;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.input};
  background-color: ${(p) => p.theme.color.bg};
`;
