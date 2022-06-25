import styled from '@emotion/styled';
import { Board, Post, User } from '@prisma/client';
import { ProfileAvatar } from './src/components/User/Avatar/Profile';

interface IAuthorProps {
  post: PostWithRelations;
}
interface PostWithRelations extends Post {
  user: User;
  board: Board;
}

export const Author = ({ post }: IAuthorProps) => {
  return (
    <Cont>
      <span>
        <ProfileAvatar url={post?.user.avatar} size={30} />
      </span>
      <span className="data">@{post?.user?.username}</span>
      <span>from</span>
      <span className="data">@{post?.board.title}</span>
    </Cont>
  );
};
const Cont = styled.div`
  gap: 5px;
  display: flex;
  align-items: center;
  justify-content: end;
  font-size: 0.8rem;
  font-weight: 400;
  font-style: italic;
  span {
    margin-right: 5px;
  }
  .data {
    color: ${(p) => p.theme.color.logo};
  }
`;
