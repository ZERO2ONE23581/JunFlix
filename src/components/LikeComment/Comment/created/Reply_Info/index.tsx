import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
import { ReplyForm } from '../../Reply';
import { CommentInfo } from '../Comment_Info';

export const ReplyInfo = ({ parentId }: any) => {
  const router = useRouter();
  const { user_id, board_id, post_id } = router.query;
  const query_id = user_id && board_id && post_id;
  const { data } = useSWR(
    query_id &&
      `/api/user/${user_id}/board/${board_id}/post/${post_id}/comment/${parentId}/reply`
  );
  const reply = data?.reply;
  //
  const [openReply, openSetReply] = useState(false);
  const [saveId, setSaveId] = useState(0);
  const replyClick = (id: number) => {
    setSaveId(id);
    openSetReply((p) => !p);
  };
  //
  return (
    <>
      {reply && (
        <Cont>
          <button
            disabled={saveId !== 0 && saveId !== reply.id}
            onClick={() => replyClick(reply.id)}
          >
            {openReply && saveId === reply.id ? 'Back' : 'Reply'}
          </button>
          <ul>
            <li>
              <span className="cmt-id">#{reply.id}</span>
              <span>{reply.content}</span>
              {openReply && saveId === reply.id && (
                <ReplyForm replyTo={reply.id} />
              )}
              <CommentInfo parentId={reply.id} />
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
  color: red;
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
