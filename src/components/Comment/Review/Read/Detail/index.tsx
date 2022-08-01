import useSWR from 'swr';
import { useState } from 'react';
import styled from '@emotion/styled';
import { BtnWrap } from '../../Edit/BtnWrap';

import { IReview } from '../../../../../types/review';
import { CreateReply } from '../../Create/Reply';
import useUser from '../../../../../libs/client/useUser';
import { IGetCommentInfo } from '../../../../../types/comments';
import { Info } from './\bInfo';
import { DelCmt } from '../../Delete';
import { ReplyList } from './\bInfo/ReplyList';

interface ICommentInfo extends IReview {
  comment_id: number;
}
export const CommentInfo = ({ review, comment_id }: ICommentInfo) => {
  const { loggedInUser } = useUser();
  const { data } = useSWR<IGetCommentInfo>(
    `/api/user/${review?.UserID}/review/${review?.id}/comment/${comment_id}`
  );
  const Comment = data?.comment;
  const [del, setDel] = useState(false);
  const [edit, setEdit] = useState(false);
  const [reply, setReply] = useState(false);
  const [selectId, setSelectId] = useState(0);
  const isReply = Boolean(selectId === Comment?.id && reply);
  const isMyComment = Boolean(Comment?.UserID === loggedInUser?.id);
  return (
    <>
      <Cont>
        <Info
          edit={edit}
          review={review!}
          comment={Comment!}
          setEdit={setEdit}
          setSelectId={setSelectId}
        />
        <BtnWrap
          setDel={setDel}
          setEdit={setEdit}
          setReply={setReply}
          selectId={selectId}
          commentId={Comment?.id!}
          isMyComment={isMyComment}
          setSelectId={setSelectId}
        />
      </Cont>

      {isReply && (
        <CreateReply
          review={review!}
          setReply={setReply}
          comment_id={selectId}
          setSelectId={setSelectId}
        />
      )}
      {Comment?.id && <ReplyList review={review!} comment_id={Comment?.id!} />}

      {del && (
        <DelCmt
          setDel={setDel}
          review={review!}
          comment_id={selectId}
          setSelectId={setSelectId}
        />
      )}
    </>
  );
};
const Cont = styled.article`
  border: none;
  font-size: 1rem;
  padding: 15px 30px;
  border-radius: 5px;
  margin-bottom: 15px;
  border: ${(p) => p.theme.border.thick};
  box-shadow: ${(p) => p.theme.boxShadow.input};
`;
