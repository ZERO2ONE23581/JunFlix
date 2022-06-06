import styled from '@emotion/styled';
import { Comment, User } from '@prisma/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
import { ReplyForm } from '../../Reply';
import { CommentInfo } from '../Comment_Info';

interface IGetAllComments {
  ok: boolean;
  error?: string;
  allComments: CommentWithUser[];
}
interface CommentWithUser extends Comment {
  user: User;
}

export const CommentList = () => {
  const router = useRouter();
  const { user_id, board_id, post_id } = router.query;
  const query_id = user_id && board_id && post_id;
  const { data } = useSWR<IGetAllComments>(
    query_id && `/api/user/${user_id}/board/${board_id}/post/${post_id}/comment`
  );
  const commentArray = data?.allComments;
  const [openReply, openSetReply] = useState(false);
  const [saveId, setSaveId] = useState(0);
  const replyClick = (id: number) => {
    setSaveId(id);
    openSetReply((p) => !p);
  };
  //
  return (
    <Cont>
      {commentArray
        ?.filter((cmt) => !cmt.ReplyID)
        ?.map((cmt) => (
          <Array key={cmt.id}>
            <ul>
              <li>
                <span className="cmt-id">#{cmt.id}</span>
                <span>{cmt.content}</span>
                <span>
                  <button
                    disabled={saveId !== 0 && saveId !== cmt.id}
                    onClick={() => replyClick(cmt.id)}
                  >
                    {openReply && saveId === cmt.id ? 'Back' : 'Reply'}
                  </button>
                </span>
                <CommentInfo id={cmt.id} />
                {openReply && saveId === cmt.id && (
                  <ReplyForm replyTo={cmt.id} />
                )}
              </li>
            </ul>
          </Array>
        ))}
    </Cont>
  );
};
const Array = styled.article`
  border: 2px solid blueviolet;
  padding: 10px;
  margin-bottom: 10px;
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
const Cont = styled.section`
  padding: 20px;
  border: 3px solid red;
`;
