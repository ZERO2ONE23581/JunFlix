import styled from '@emotion/styled';
import { Comment, User } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { CmtAvatarLogo } from '../../../../styles/avatar';
import useAvatar from '../../../libs/client/useAvatar';
import { CommentBtnWrap } from '../Button';
import { Replies } from './Replies';
import { CreateComment } from './Create';
import { EditComment } from './Edit';

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
  const [openReply, setOpenReply] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  //
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
            <CmtAvatarLogo>
              {comment.user.avatar ? (
                <img
                  src={`${useAvatar(comment.user.avatar)}`}
                  alt="프로필 이미지"
                />
              ) : (
                <img src="/img/profile.svg" alt="프로필 이미지" />
              )}
            </CmtAvatarLogo>
            <CmtDesc>
              <DescWrap>
                <CmtInfo>
                  <span className="id">#{comment.id}</span>
                  <span className="username">{comment.user.username}</span>
                  <span className="date">created at {date}</span>
                </CmtInfo>
                <CommentBtnWrap
                  id={comment.id}
                  saveId={saveId}
                  setSaveId={setSaveId}
                  setOpenReply={setOpenReply}
                  setOpenEdit={setOpenEdit}
                />
              </DescWrap>
              {openEdit && saveId === comment.id ? (
                <EditComment parentId={comment.id} />
              ) : (
                <Content>{comment.content}</Content>
              )}
            </CmtDesc>
          </div>
          {openReply && saveId === comment.id && (
            <CreateComment parentId={comment.id} />
          )}
          <Replies parentId={comment.id} />
        </>
      )}
    </Cont>
  );
};
const Content = styled.article`
  margin-bottom: 15px;
  width: 100%;
  padding: 15px;
  font-size: 1.1rem;
`;
const Cont = styled.article`
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
  .avatar-desc-wrap {
    position: relative;
    gap: 20px;
    display: flex;
    align-items: center;
  }
`;
const CmtDesc = styled.article`
  width: 100%;
  font-size: 1.2rem;
  padding: 10px 0;
  padding-left: 75px;
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
  margin-bottom: 5px;
`;
