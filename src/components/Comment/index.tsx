import styled from '@emotion/styled';
import { Comment, User } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { AvatarLogo } from '../../../styles/image';
import useAvatar from '../../libs/client/useAvatar';
import { Replies } from './Replies';
import { CreateComment } from './Create';
import { EditComment } from './Edit';
import { ErrMsg } from '../../../styles/default';
import { ManageCommentBtn } from './Button';
import { CommentDeleteModal } from '../Modal/Comment/Delete';
import { ICommentInfoProps, IGetCommentInfo } from '../../types/comments';

export const CommentInfo = ({ commentId }: ICommentInfoProps) => {
  const router = useRouter();
  const { user_id, board_id, post_id } = router.query;
  const queryId = user_id && board_id && post_id && commentId;
  const { data } = useSWR<IGetCommentInfo>(
    queryId &&
      `/api/user/${user_id}/board/${board_id}/post/${post_id}/comment/${commentId}`
  );
  const comment = data?.comment;
  const [saveId, setSaveId] = useState(0);
  const [openReply, setOpenReply] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
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
    <>
      <Cont>
        {data?.error && <ErrMsg>{data.error}</ErrMsg>}
        <Wrap>
          <Avatar>
            {comment?.user.avatar ? (
              <img
                src={`${useAvatar(comment?.user.avatar)}`}
                alt="프로필 이미지"
              />
            ) : (
              <img src="/img/profile.svg" alt="프로필 이미지" />
            )}
          </Avatar>
          <Desc>
            <DescWrap>
              <CmtInfo>
                <span className="id">#{comment?.id}</span>
                <span className="username">{comment?.user.username}</span>
                <span className="date">created at {date}</span>
              </CmtInfo>
              <ManageCommentBtn
                id={comment?.id}
                ownerId={comment?.UserID}
                saveId={saveId}
                setSaveId={setSaveId}
                setOpenReply={setOpenReply}
                setOpenEdit={setOpenEdit}
                setOpenDelete={setOpenDelete}
              />
            </DescWrap>
            {openEdit && saveId === comment?.id ? (
              <EditComment
                parentId={comment?.id}
                ogContent={comment?.content}
              />
            ) : (
              <Content>{comment?.content}</Content>
            )}
          </Desc>
        </Wrap>
        {openReply && saveId === comment?.id && (
          <CreateComment parentId={comment?.id} />
        )}
        <Replies parentId={comment?.id} />
        {openDelete && (
          <CommentDeleteModal
            id={comment?.id}
            setSaveId={setSaveId}
            setOpenDelete={setOpenDelete}
          />
        )}
      </Cont>
    </>
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
const Avatar = styled(AvatarLogo)`
  width: 65px;
  height: 65px;
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
