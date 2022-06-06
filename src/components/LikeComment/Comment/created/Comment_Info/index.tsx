import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import useSWR from 'swr';
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
          <ul>
            <li>
              <span className="cmt-id">#{reply.id}</span>
              <span>{reply.content}</span>
              <span>
                <ReplyInfo parentId={reply.id} />
              </span>
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
