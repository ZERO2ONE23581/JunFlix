import useSWR from 'swr';
import { useState } from 'react';
import styled from '@emotion/styled';
import { PostText } from '../../../Text';
import { ReplyList } from './Reply/List';
import { EditComment } from '../../Edit';
import { Profile } from './Content/Profile';
import { CreateReply } from '../../Create/Reply';
import { DeleteComment } from '../../Delete/Modal';
import { SettingBtns } from '../../Edit/SettingBtns';
import { IQuery } from '../../../../../../../../types/global';
import useUser from '../../../../../../../../libs/client/useUser';
import { IGetCommentInfo } from '../../../../../../../../types/comments';

interface ICommentInfo extends IQuery {
  commentId: number;
  isInReply?: boolean;
}
export const CommentInfo = ({ query, commentId, isInReply }: ICommentInfo) => {
  const { data } = useSWR<IGetCommentInfo>(
    `/api/user/${query.userId}/board/${query.boardId}/post/${query.postId}/comment/${commentId}`
  );
  const { loggedInUser } = useUser();
  const [edit, setEdit] = useState(false);
  const [reply, setReply] = useState(false);
  const [chosenId, setChosenId] = useState(0);
  const [deleteComment, setDelete] = useState(false);
  const replyList = query && data?.comment?.id;
  const createReply = Boolean(chosenId === data?.comment?.id && reply);
  const isMyComment = Boolean(data?.comment?.UserID === loggedInUser?.id);

  return (
    <>
      <Cont>
        <Profile
          size="3rem"
          isInReply={isInReply!}
          userAvatar={data?.comment?.user?.avatar!}
        />
        <Wrap>
          {!edit && (
            <PostText
              sliceFrom={100}
              content={data?.comment?.content!}
              username={data?.comment?.user?.username!}
              date={{
                createdAt: data?.comment?.createdAt!,
                updatedAt: data?.comment?.updatedAt!,
              }}
            />
          )}
          {edit && (
            <EditComment
              query={query}
              setEdit={setEdit}
              chosenId={chosenId}
              comment={data?.comment!}
              setChosenId={setChosenId}
            />
          )}
          <SettingBtns
            setEdit={setEdit}
            setReply={setReply}
            chosenId={chosenId}
            setDelete={setDelete}
            isMyComment={isMyComment}
            setChosenId={setChosenId}
            comment_id={data?.comment?.id!}
          />
        </Wrap>
      </Cont>

      {createReply && (
        <CreateReply
          query={query}
          setReply={setReply}
          comment_id={chosenId}
          setChosenId={setChosenId}
        />
      )}
      {replyList && <ReplyList query={query} comment_id={data?.comment?.id!} />}
      {deleteComment && (
        <DeleteComment
          query={query}
          setDelete={setDelete}
          chosenId={chosenId}
          setChosenId={setChosenId}
        />
      )}
    </>
  );
};
const Cont = styled.article`
  border-radius: 5px;
  gap: 1rem;
  display: flex;
  padding: 1rem 0;
  font-size: 1.1rem;
  align-items: flex-start;
`;
const Wrap = styled.div`
  width: 100%;
`;
