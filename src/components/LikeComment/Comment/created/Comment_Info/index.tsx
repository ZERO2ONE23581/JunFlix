import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
import { ToggleBtn } from '../../../../Button/toggle';
import { ReplyForm } from '../../Reply';
import { ReplyInfo } from '../Reply_Info';

export const CommentInfo = ({ id, parentId }: any) => {
  const router = useRouter();
  const { user_id, board_id, post_id } = router.query;
  const queryForComment = user_id && board_id && post_id && id;
  const queryForReply = user_id && board_id && post_id && parentId;
  const { data } = useSWR(
    queryForComment &&
      `/api/user/${user_id}/board/${board_id}/post/${post_id}/comment/${id}`
  );
  const comment = data?.comment;
  const { data: replyData } = useSWR(
    queryForReply &&
      `/api/user/${user_id}/board/${board_id}/post/${post_id}/comment/${parentId}/reply`
  );
  const reply = replyData?.reply;
  const [openReply, setOpenReply] = useState(false);
  const [saveId, setSaveId] = useState(0);
  //
  return (
    <>
      {comment && (
        <Cont>
          <ul>
            <li>
              <span className="cmt-id">#{comment.id}</span>
              <span>{comment.content}</span>
              <span>
                <ReplyInfo parentId={comment.id} />
              </span>
            </li>
          </ul>
        </Cont>
      )}
      {reply && (
        <Cont>
          <ToggleBtn
            id={reply.id}
            open={openReply}
            setOpen={setOpenReply}
            saveId={saveId}
            setSaveId={setSaveId}
          />
          <ul>
            <li>
              <span className="cmt-id">#{reply.id}</span>
              <span>{reply.content}</span>
              <span>
                <ReplyInfo parentId={reply.id} />
              </span>
              {openReply && saveId === reply.id && (
                <ReplyForm replyTo={reply.id} />
              )}
            </li>
          </ul>
        </Cont>
      )}
    </>
  );
};
const Cont = styled.section`
  border: 3px solid black;
  padding: 20px;
  color: blue;
  ul {
    li {
      .cmt-id {
        font-weight: bold;
        margin-right: 5px;
      }
      span {
        font-size: 1rem;
      }
    }
  }
`;
