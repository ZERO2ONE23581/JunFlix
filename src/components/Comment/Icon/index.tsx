import styled from '@emotion/styled';
import { Post, User } from '@prisma/client';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Icons } from '../../../../styles/svg';

interface IGetPostWithCounts {
  ok: boolean;
  error?: string;
  isLiked?: boolean;
  isComments?: boolean;
  post: CountsInPost;
}
interface CountsInPost extends Post {
  _count: {
    likes: number;
    comments: number;
  };
}
export const CommentIcon = () => {
  const router = useRouter();
  const { user_id, board_id, post_id } = router.query;
  const query_id = user_id && board_id && post_id;
  const { data } = useSWR<IGetPostWithCounts>(
    query_id && `/api/user/${user_id}/board/${board_id}/post/${post_id}`
  );
  const Count = data?.post?._count.comments;
  //
  return (
    <Cont>
      <Icon>
        {data?.isComments ? (
          <Icons name="comments" type="solid" />
        ) : (
          <Icons name="comments" type="empty" />
        )}
      </Icon>
      <Counts>
        <span>{Count ? Count : '0'}</span>
        <span>Comments</span>
      </Counts>
    </Cont>
  );
};
const Cont = styled.article`
  gap: 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
const Icon = styled.div`
  svg {
    width: 30px;
    height: 30px;
  }
`;
const Counts = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  span {
    text-align: center;
    font-size: 1.1rem;
    font-weight: 600;
  }
`;
