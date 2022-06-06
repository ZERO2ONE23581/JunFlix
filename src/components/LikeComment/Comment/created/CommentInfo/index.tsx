import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export const CommentInfo = ({ id }: any) => {
  const router = useRouter();
  const { user_id, board_id, post_id } = router.query;
  const query_id = user_id && board_id && post_id;
  const { data } = useSWR(
    query_id &&
      `/api/user/${user_id}/board/${board_id}/post/${post_id}/comment/${id}`
  );
  const comment = data?.comment;
  return (
    <>
      {comment && (
        <Cont>
          <ul>
            <li>
              <span className="cmt-id">#{comment.id}</span>
              <span>{comment.content}</span>
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
