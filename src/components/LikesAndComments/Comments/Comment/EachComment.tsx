import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
import { ReplyBtn } from '../../../Button/Comment/Reply';
import { CreateComment } from '../Create';
import { Replies } from '../Replies';

interface IEachCommentProps {
  commentId: number | any;
}
export const EachComment = ({ commentId }: IEachCommentProps) => {
  const router = useRouter();
  const { user_id, board_id, post_id } = router.query;
  const queryForComment = user_id && board_id && post_id && commentId;
  const { data } = useSWR(
    queryForComment &&
      `/api/user/${user_id}/board/${board_id}/post/${post_id}/comment/${commentId}`
  );
  const comment = data?.comment;
  const [saveId, setSaveId] = useState(0);
  //
  return (
    <>
      {comment && (
        <Cont>
          <ReplyBtn id={comment.id} saveId={saveId} setSaveId={setSaveId} />
          <span className="cmt-id">#{comment.id}</span>
          <Content>{comment.content}</Content>
          <Replies parentId={comment.id} />
          {saveId === comment.id && <CreateComment parentId={comment.id} />}
        </Cont>
      )}
    </>
  );
};
const Content = styled.p`
  padding: 20px;
  color: #ff7675;
  border-radius: 5px;
  border: 3px solid #ff7675;
`;
const Cont = styled.article`
  padding: 20px;
  margin: 10px auto;
  color: #3498db;
  border-radius: 5px;
  border: 5px solid #3498db;
  gap: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
