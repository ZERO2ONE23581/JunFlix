import useSWR from 'swr';
import styled from '@emotion/styled';
import { Post, User } from '@prisma/client';
import { Icons } from '../../../styles/svg';
import useMutation from '../../libs/client/useMutation';
import { useRouter } from 'next/router';

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
export const LikesIcon = () => {
  const router = useRouter();
  const { user_id, board_id, post_id } = router.query;
  const query_id = user_id && board_id && post_id;
  const { data, mutate } = useSWR<IGetPostWithCounts>(
    query_id && `/api/user/${user_id}/board/${board_id}/post/${post_id}`
  );
  const likesCount = data?.post?._count.likes;
  const [createLikes] = useMutation(
    `/api/user/${user_id}/board/${board_id}/post/${post_id}/create/likes`
  );
  const handleClick = () => {
    if (!data) return;
    mutate(
      {
        ...data,
        isLiked: !data.isLiked,
        post: {
          ...data?.post,
          _count: {
            ...data.post?._count,
            likes: data.isLiked
              ? data.post?._count.likes - 1
              : data.post?._count.likes + 1,
          },
        },
      },
      false
    );
    createLikes({});
  };
  return (
    <>
      <Cont>
        <IconBtn onClick={handleClick}>
          {!data?.isLiked ? (
            <Icons name="likes" type="empty" />
          ) : (
            <Icons name="likes" type="solid" />
          )}
        </IconBtn>
        <Counts>
          <span>{likesCount ? likesCount : '0'}</span>
          <span> Likes</span>
        </Counts>
      </Cont>
    </>
  );
};
const Cont = styled.article`
  gap: 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
const IconBtn = styled.button`
  border: none;
  background-color: inherit;
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
