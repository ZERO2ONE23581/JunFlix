import useSWR from 'swr';
import { useState } from 'react';
import styled from '@emotion/styled';
import { BtnWrap } from '../Edit/BtnWrap';
import { PostReplyList } from './ReplyList';
import { EditPostCmt } from '../Edit/Comment';
import { CreatePostReply } from '../Create/Reply';
import useUser from '../../../../libs/client/useUser';
import { DeletePostComment } from '../Delete/Comment';
import { IGetCommentInfo, IPostComment } from '../../../../types/comments';

interface ICommentInfo extends IPostComment {
  commentId: number;
}
export const CommentInfo = ({ post, commentId }: ICommentInfo) => {
  const { loggedInUser } = useUser();
  const { data } = useSWR<IGetCommentInfo>(
    `/api/user/${post?.UserID}/board/${post?.BoardID}/post/${post?.id}/comment/${commentId}`
  );
  const Comment = data?.comment;
  const [selectId, setSelectId] = useState(0);
  const [editCmt, setEditCmt] = useState(false);
  const [replyCmt, setReplyCmt] = useState(false);
  const [deleteCmt, setDeleteCmt] = useState(false);
  const isReply = Boolean(selectId === Comment?.id && replyCmt);
  const isMyComment = Boolean(Comment?.UserID === loggedInUser?.id);
  return (
    <>
      <Cont>
        <EditPostCmt
          post={post!}
          comment={Comment!}
          editCmt={!editCmt}
          setEditCmt={setEditCmt}
          setSelectId={setSelectId}
        />
        <BtnWrap
          selectId={selectId}
          commentId={Comment?.id!}
          isMyComment={isMyComment}
          setSelectId={setSelectId}
          setEditCmt={setEditCmt}
          setReplyCmt={setReplyCmt}
          setDeleteCmt={setDeleteCmt}
        />
      </Cont>
      {isReply && (
        <CreatePostReply
          post={post!}
          comment_id={selectId}
          setSelectId={setSelectId}
          setReplyCmt={setReplyCmt}
        />
      )}
      <PostReplyList post={post!} comment_id={Comment?.id!} />
      {deleteCmt && (
        <DeletePostComment
          post={post!}
          comment_id={selectId}
          setSelectId={setSelectId}
          setDeleteCmt={setDeleteCmt}
        />
      )}
    </>
  );
};
const Cont = styled.article`
  position: relative;
  padding: 20px 20px 10px;
  border: none;
  font-size: 0.9rem;
  /* border-bottom: ${(p) => p.theme.border.thin}; */
  .edit-comment-btns {
    gap: 10px;
    svg {
      width: 0.8rem;
      height: 0.8rem;
    }
  }
`;
