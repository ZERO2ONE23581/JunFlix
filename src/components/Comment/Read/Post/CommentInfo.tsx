import useSWR from 'swr';
import { useState } from 'react';
import styled from '@emotion/styled';
import { BtnWrap } from '../../BtnWrap';
import { PostReplies } from './PostReplies';
import { PostComment } from '../../Edit/PostComment';
import useUser from '../../../../libs/client/useUser';
import { CreatePostReply } from '../../Create/Post/CreatePostReply';
import { DeletePostComment } from '../../Delete/Post/DeletePostComment';
import { IGetCommentInfo, IPostComment } from '../../../../types/comments';

interface ICommentInfo extends IPostComment {
  commentId: number;
}
export const PostCommentInfo = ({ post, commentId }: ICommentInfo) => {
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
        <BtnWrap
          selectId={selectId}
          commentId={Comment?.id!}
          isMyComment={isMyComment}
          setSelectId={setSelectId}
          setEditCmt={setEditCmt}
          setReplyCmt={setReplyCmt}
          setDeleteCmt={setDeleteCmt}
        />
        <PostComment
          post={post!}
          comment={Comment!}
          editCmt={!editCmt}
          setEditCmt={setEditCmt}
          setSelectId={setSelectId}
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
      <PostReplies post={post!} comment_id={Comment?.id!} />
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
  padding: 10px 20px;
  border: none;
  font-size: 0.9rem;
  border-bottom: ${(p) => p.theme.border.thin};
  .edit-comment-btns {
    gap: 10px;
    svg {
      width: 0.8rem;
      height: 0.8rem;
    }
  }
`;
