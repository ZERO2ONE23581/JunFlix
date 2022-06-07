import styled from '@emotion/styled';
import { Comment, User } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { AvatarLogo } from '../../../../styles/avatar';
import useAvatar from '../../../libs/client/useAvatar';
import { ReplyBtn } from '../Button';
import { Replies } from './Replies';
import { CreateComment } from './Create';

interface IEachCommentProps {
  commentId: number | any;
}
interface IGetCommentInfo {
  comment: CommentWithUser;
}
interface CommentWithUser extends Comment {
  user: User;
}
export const CommentInfo = ({ commentId }: IEachCommentProps) => {
  const router = useRouter();
  const { user_id, board_id, post_id } = router.query;
  const queryForComment = user_id && board_id && post_id && commentId;
  const { data } = useSWR<IGetCommentInfo>(
    queryForComment &&
      `/api/user/${user_id}/board/${board_id}/post/${post_id}/comment/${commentId}`
  );
  const comment = data?.comment;
  const [saveId, setSaveId] = useState(0);
  const [date, setDate] = useState('');
  useEffect(() => {
    if (comment) {
      const date = new Date(comment.createdAt);
      setDate(
        `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
      );
    }
  }, [comment, setDate]);
  //
  return (
    <Cont>
      {comment && (
        <>
          <div className="avatar-desc-wrap">
            <AvatarLogo>
              {comment.user.avatar ? (
                <img
                  src={`${useAvatar(comment.user.avatar)}`}
                  alt="프로필 이미지"
                />
              ) : (
                <img src="/img/profile.svg" alt="프로필 이미지" />
              )}
            </AvatarLogo>
            <Description>
              <InfoBtnWrap>
                <div className="info">
                  <span className="id">#{comment.id}</span>
                  <span className="username">{comment.user.username}</span>
                  <span className="date">created at {date}</span>
                </div>
                <ReplyBtn
                  id={comment.id}
                  saveId={saveId}
                  setSaveId={setSaveId}
                />
              </InfoBtnWrap>
              <p>{comment.content}</p>
            </Description>
          </div>
          {saveId === comment.id && <CreateComment parentId={comment.id} />}
          <Replies parentId={comment.id} />
        </>
      )}
    </Cont>
  );
};
const Cont = styled.article`
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
  .avatar-desc-wrap {
    gap: 10px;
    display: flex;
    align-items: center;
  }
`;
const Description = styled.article`
  width: 100%;
  font-size: 1.2rem;
  padding: 10px 20px;
  border-radius: 5px;
`;
const InfoBtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
  .info {
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
  }
`;
