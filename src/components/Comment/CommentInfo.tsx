import useSWR from 'swr';
import { Date } from './Date';
import { useState } from 'react';
import { BtnWrap } from './BtnWrap';
import styled from '@emotion/styled';
import { IComment } from './ReadComment';
import { CommentReplies } from './CommentReplies';
import { EditComments } from './Edit/EditComments';
import { IGetCommentInfo } from '../../types/comments';
import { CreateComments } from './Create/CreateComments';
import { DeleteComments } from './Delete/DeleteComments';

interface ICommentInfo extends IComment {
  commentId: number | any;
}
export const CommentInfo = ({
  USERID,
  BOARDID,
  POSTID,
  REVIEWID,
  commentId,
}: ICommentInfo) => {
  const { data } = useSWR<IGetCommentInfo>(
    BOARDID && POSTID
      ? `/api/user/${USERID}/board/${BOARDID}/post/${POSTID}/comment/${commentId}`
      : REVIEWID
      ? `/api/user/${USERID}/review/${REVIEWID}/comment/${commentId}`
      : null
  );
  const Comment = data?.comment;
  const [edit, setEdit] = useState(false);
  const [saveId, setSaveId] = useState(0);
  const [reply, setReply] = useState(false);
  const [delComment, setDelComment] = useState(false);
  const isReplyOK = Boolean(saveId === Comment?.id) && reply;
  return (
    <Cont>
      <EachComment>
        <Flex>
          <div className="flex">
            <span>@{Comment?.user.userId}</span>
            <Date CREATEDAT={Comment?.createdAt!} />
          </div>
          <BtnWrap
            id={Comment?.id!}
            saveId={saveId}
            ownerId={Comment?.UserID!}
            setEdit={setEdit}
            setReply={setReply}
            setSaveId={setSaveId}
            setDelComment={setDelComment}
          />
        </Flex>
        <EditComments
          disabled={!edit}
          USERAVATAR={Comment?.user.avatar!}
          USERID={USERID}
          BOARDID={BOARDID}
          POSTID={POSTID}
          REVIEWID={REVIEWID}
          parentId={Comment?.id}
          CONTENT={Comment?.content}
        />
      </EachComment>
      {isReplyOK && (
        <CreateComments
          USERID={USERID}
          BOARDID={BOARDID}
          POSTID={POSTID}
          REVIEWID={REVIEWID}
          replyID={Comment?.id!}
        />
      )}
      <CommentReplies
        USERID={USERID}
        BOARDID={BOARDID}
        POSTID={POSTID}
        REVIEWID={REVIEWID}
        replyID={Comment?.id!}
      />
      {delComment && (
        <DeleteComments
          id={Comment?.id}
          setSaveId={setSaveId}
          setDelComment={setDelComment}
          POSTID={POSTID}
          USERID={USERID}
          BOARDID={BOARDID}
          REVIEWID={REVIEWID}
        />
      )}
    </Cont>
  );
};

const Cont = styled.article`
  margin-top: 20px;
  margin-left: 40px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .flex {
    gap: 20px;
    display: flex;
    align-items: center;
  }
`;
const EachComment = styled.div`
  min-height: 200px;
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  border: ${(p) => p.theme.border.thick};
`;
