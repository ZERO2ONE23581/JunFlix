import useSWR from 'swr';
import styled from '@emotion/styled';
import { Svg } from '../../../../../Tools/Svg';
import { IGetPost, PostModel } from '../../../../../types/post';

interface IPostIcons {
  post: PostModel;
}
export const PostIcons = ({ post }: IPostIcons) => {
  const { data } = useSWR<IGetPost>(
    `/api/user/${post.UserID}/board/${post.BoardID}/post/${post.id}`
  );
  const LikesCount = data?.post?._count.likes;
  const CommentsCount = data?.post?._count.comments;
  const isLiked = Boolean(data?.post?.likes.length! > 0);
  const isComment = Boolean(data?.post.comments.length! > 0);
  return (
    <Cont className="post-icon">
      <li>
        {isLiked ? (
          <>
            <Svg size="2.3rem" type="solid-heart" />
            <Count>{LikesCount}</Count>
          </>
        ) : (
          <Svg size="2.3rem" type="unsolid-heart" />
        )}
      </li>
      <li>
        {isComment ? (
          <>
            <Svg size="2.3rem" type="solid-comment" />
            <Count>{CommentsCount}</Count>
          </>
        ) : (
          <Svg size="2.3rem" type="unsolid-comment" />
        )}
      </li>
    </Cont>
  );
};
const Cont = styled.ul`
  gap: 50px;
  z-index: 1;
  width: 100%;
  opacity: 0.7;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => p.theme.color.bg};
  li {
    position: relative;
  }
`;
const Count = styled.span`
  top: -5px;
  right: -15px;
  font-weight: 700;
  position: absolute;
  color: ${(p) => p.theme.color.logo};
`;
